const mongoose = require("mongoose");


const DB = process.env.MONGO_URL

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})


//const DB = 'mongodb+srv://ryan:qwer1234@cluster0.dtlmr7s.mongodb.net/Authusers?retryWrites=true&w=majority';
