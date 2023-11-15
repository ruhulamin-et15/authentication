const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
const MongoStore = require('connect-mongo');
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
    mongoUrl: "mongodb://127.0.0.1:27017/Passports2",
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

const checkeLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile");
    }
    next();
};

// login : get
app.get("/login", checkeLoggedIn, (req,res)=>{
    res.render("login");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: "/profile" }),
  (req,res)=>{
    res.redirect("/");
  }
);


// profile protected route
const checkAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.get("/profile", checkAuthenticated, (req,res)=>{
    res.render("profile", {username: req.user.username});
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