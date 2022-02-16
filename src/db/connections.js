const mongoose =require('mongoose')

mongoose.connect("mongodb://localhost:27017/Loginpageadvanced").then(()=>{
     console.log("connection successfull")
}).catch((errr)=>console.log("no connnection"))