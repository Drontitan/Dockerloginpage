const express =require('express');
const fs =require('fs');
const hbs =require('hbs');
const path =require('path');
const port = process.env.PORT || 3000;

const app =express();
require("./db/connections")
const Register = require("./models/loginpageschema")

const staticpath = path.join(__dirname, "../public");
const teamplatespath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");


app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", teamplatespath);
hbs.registerPartials(partialpath);


app.get("/", (req, res) => {
  res.render('loginpage');
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async(req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    console.log(password);
    if (password === confirmpassword) {
      const rgisteremployee = new Register({
        firstname: req.body.username,
        lasttname: req.body.surname,
        emailid: req.body.email,
        password: password,
        confirmpassword: confirmpassword,
      });
      const rgestired = await rgisteremployee.save();
      res.status(201).send("hello how are you?")
    } else {
      res.send("password are not matching ");
    }
  }catch (err) {
    res.status(400).send("error page");
    console.log("the error part"+err);
  }
});

app.listen(port,()=>{console.log(`the server is running at the port ${port}`)});