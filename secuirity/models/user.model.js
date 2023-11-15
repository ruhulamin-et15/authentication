const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// require("dotenv").config();

//creating schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn : {
        type: Date,
        default: Date.now
    },
});

// // key encryption
// const encKey = process.env.ENC_KEY;
// userSchema.plugin(encrypt, {
//     secret: encKey, 
//     encryptedFields: ["password"],
// });

// hashing password

module.exports = mongoose.model("users", userSchema);

