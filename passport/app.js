const express = require("express");
const ejs = require("ejs")
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
const MongoStore = require('connect-mongo');
const User = require("./models/user.model");
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

//express session use
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/Passports",
    collectionName: "sessions"
  }),
//   cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

//base url
app.get("/", (req,res)=>{
    res.render("index");
});


// register : get
app.get("/register", (req,res)=>{
    res.render("register");
});


// register : post---- ok
app.post("/register",async (req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
            if(user) return res.status(400).send("user already created");

        bcrypt.hash(req.body.password, saltRounds,async (err, hash)=>{
            const newUser = new User({
                username: req.body.username,
                password: hash,
            });
            await newUser.save();
            res.redirect("/login");
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// login : get
const checkeLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile");
    }
    next();
};
app.get("/login", checkeLoggedIn, (req,res)=>{
    res.render("login");
});


// login : post----- 
app.post('/login', 
  passport.authenticate('local', {
     failureRedirect: '/login', 
     successRedirect: "/profile",
    })
);


// profile protected route
const checkAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
app.get("/profile", checkAuthenticated, (req,res)=>{
    res.render("profile");
});


// logout route
app.get("/logout", (req,res)=>{
    try {
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            res.redirect("/");
        });
    } catch (error) {
       res.status(500).send(error.message);
    }
});

module.exports = app;