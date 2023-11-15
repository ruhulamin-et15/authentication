const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Database is connected! happy programming...");
    } catch (error) {
        console.log("not connected DB");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
