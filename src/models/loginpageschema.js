const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true, "it must have the username"]
    },
    lastname: {
        type: String,
        required: [true, "it must have the lastname"]
    },
    emailid: {
        type: String,
        unique: true,
        required: [true, "email id is required"]
    },
    password: {
        type: String,
        required: [true, "pls enter the password "]
    },
    confirmpassword: {
        type: String,
        required: true,
    },

})
studentSchema.methods.generateauthtoken = async function() {
    try {
        console.log(this.id);
        const token = jwt.sign({ id: this.id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        // console.log(token);
        return token;
    } catch (error) {
        // res.send("the error part"+error);
        console.log("the error part" + error);
    }
}


//converting password in to hash
studentSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        // console.log(`tha password is ${this.password}`)
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`tha password is ${this.password}`)
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();

})

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;