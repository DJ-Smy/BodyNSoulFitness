const jwt = require('jsonwebtoken');
const userdb = require('../models/userSchema');
const keysecret = process.env.KEYSCERET;

// 이것을 사용하여 우리는 로그인 되어있는 유저의 정보를 파악할수 있다.
const authenticate = async(req, res, next) => {

    try{
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token, keysecret);

        //console.log(verifytoken); => check 해보면 id를 확인할수 있다 따라서 밑에서 id로 그 유저를 찾는것이다.

        const rootUser = await userdb.findOne({_id: verifytoken._id})

        //console.log(rootUser); //=> db안에 있는 id를 가지고 있는 사람을 확인 가능.

        if(!rootUser) {throw new Error("user not found")};

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
        
    } catch (error) {
        res.status(401).json({status:401, message:"Unauthorized no token provided"})
    }

}

module.exports = authenticate;