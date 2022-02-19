const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} = require("../config");

const app = express();
const mongoURL = `mongodb://mongodb:${MONGO_PORT}/StudentRegister`;

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("succesfully connected to DB"))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 30000);
        });
};
connectWithRetry();

const Register = require("./models/loginpageschema")

const staticpath = path.join(__dirname, "../public");
const teamplatespath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", teamplatespath);
hbs.registerPartials(partialpath);


app.get("/", (req, res) => {
    res.render('loginpage');
    console.log("yeah it ran");
});
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        console.log(password, confirmpassword);
        if (password === confirmpassword) {
            const rgisteremployee = new Register({
                firstname: req.body.username,
                lastname: req.body.surname,
                emailid: req.body.email,
                password: password,
                confirmpassword: confirmpassword,
            });
            const rgestired = await rgisteremployee.save();
            res.status(201).send("hello how are you?")
        } else {
            res.send("password are not matching ");
        }
    } catch (err) {
        res.status(400).send("error page");
        console.log("the error part" + err);
    }
});
app.post("/", async(req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const check = await Register.findOne({ emailid: email });
        const ismatch = await bcrypt.compare(password, check.password); // bcrypt comparing the password 
        // if (check.password === password) {
        if (ismatch) {
            res.status(201).send("hogya login ");
        } else {
            res.status(400).send("The password is invalid");
        }
    } catch (error) {
        res.status(400).send("this is a invalid id");
        console.log(error);
    }

})
app.listen(port, () => { console.log(`the server is running at the port ${port}`) });