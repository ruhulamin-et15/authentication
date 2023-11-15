const express = require("express");
const cors = require("cors");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//home route
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
});

// //create a user
// app.post("/register",async (req,res)=>{
//     try {
//         bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
//             const newUser = new User({
//                 email: req.body.email,
//                 password: hash,
//             });
//             await newUser.save();
//             res.status(201).json(newUser);
//         });
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
// });



// //login user
// app.post("/login",async (req,res)=>{
// try {
//     const email = req.body.email;
//     const password = req.body.password
//     const user = await User.findOne({email:email});
//     if(user){
//         bcrypt.compare(password, user.password, function(err, result) {
//             if(result === true){
//                 res.status(200).json({status: "valid user"});
//             }else{
//                 res.status(404).json({status: " invalid user"});
//             }
//         }); 
//     }
// } catch (error) {
//     res.status(500).json(error.message);
// }
// });

module.exports = app;