const mongoose =require('mongoose')

const studentSchema =new mongoose.Schema({

     firstname:{
         type:String,
         required:true
     },
     lastname:{
         type:String,
         required:true
     },
     emailid:{
         type:String,
         unique:true,
         required:true,
     },
     password:{
         type:String,
         required:true,
     },
     confirmpassword:{
         type:String,
         required:true,
     },

})

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;