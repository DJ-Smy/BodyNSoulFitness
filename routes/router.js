const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const keysecret = process.env.KEYSCERET;


// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:process.env.CLIENT_GMAIL,
        pass:process.env.CLIENT_GMAIL_PWD
    }
})


// for user registration

router.post('/register',async(req, res) => {
    
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    //prevent to duplicate registration with same email
    try {
        const preuser = await userdb.findOne({ email: email });

        if(preuser) {
            res.status(422).json({ error: "This Email already exists"})
        }else if(password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password not match"})
        }else {
            const finalUser = new userdb({
                fname,email,password,cpassword
            });

            // here password hasing (using decording is too inefficient so we need to use hasing) -> in userSchema 
                const storeData = await finalUser.save();

                //console.log(storeData);

                res.status(201).json({status:201,storeData});
        }

    } catch(err) {
        res.status(422).json(err);
        console.log('catch block error');
    }
})

// user Login


router.post("/login", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});

    /// user valid (validuser에서 확인을 거친후 그것의 데이터를 받아오는것이다.)
    // user valid
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


//  user logout

 router.get("/logout",authenticate,async(req,res)=>{
     try {
         req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
             return curelem.token !== req.token
         });

         res.clearCookie("usercookie",{path:"/"});

         req.rootUser.save();

         res.status(201).json({status:201})

     } catch (error) {
        res.status(401).json({status:401,error})
     }
 })


 // send email Link for reset password

 router.post('/sendpasswordlink',async(req, res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email) {
        res.status(401).json({status:401,message:"Enter your email address"})
    }

    try {
        // first we should find the email address within DB
        const userfind = await userdb.findOne({email:email});

        //console.log("user Find: ", userfind);

        //token generate for reset password
        const token = jwt.sign({_id: userfind._id}, keysecret, {
            expiresIn:"120s" //<- limitation for reset password (2mins)
        });

        //console.log("token Generated: ", token);

        //위에서 패스워드 리셋을 위한 토큰을 발행하고 우리는 id를 사용하여 db에 있는 정보를 가져온다.
        //verifytoken 에 현재 토큰을 넣어준다. 즉 DB에 유무를 파악한후 새로운 토큰을 발행하고 넣어주는것이다.
        const setusertoken = await userdb.findByIdAndUpdate({_id: userfind._id}, {verifytoken:token},{new:true});

        //console.log('setusertoken', setusertoken);

        if(setusertoken){
            const mailOptions = {
                from:process.env.CLIENT_GMAIL,
                to:email,
                subject:"Sending Email for password reset",
                text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    console.log("error", error);
                    res.status(401).json({status:401, message:"Email not send"})
                }else{
                    console.log("Email sent", info.response);
                    res.status(201).json({status:201, message:"Email send successfully"})
                }
            })
        }
        
        

    } catch(error) {
        res.status(401).json({status:401, message:"invalid email(user)"})
    }
 })


 // verify user for forgot password time
router.get('/forgotpassword/:id/:token', async(req, res)=>{
    const {id, token} = req.params;
    //console.log(id, token)

    try {
        // 비밀번호를 잃버버린 사람이 singup된 이메일을 가지고 링크를 탔으며 그링크의 id 와 토큰이 db에 저장된 verifytoken값과 맞는지 확인.
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        //console.log(validuser);

        const verifyToken = jwt.verify(token, keysecret);
        
        console.log(verifyToken);

        if(validuser && verifyToken._id){
            res.status(201).json({status:201, validuser});
        }else{
            res.status(401).json({status:401, message: "user not exist"});
        }


    } catch (error) {
        res.status(401).json({status:401, error});
    }
});

// change password
router.post("/:id/:token", async(req, res) => {
    const {id, token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});

        const verifyToken = jwt.verify(token, keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpassword = await userdb.findByIdAndUpdate({_id:id}, {password:newpassword});

            setnewuserpassword.save();

            res.status(201).json({status:201, setnewuserpassword});

        }else{
            res.status(401).json({status:401, message: "user not exist"});
        }
    } catch (error) {
        res.status(401).json({status:401, error});
    }
})


module.exports = router;