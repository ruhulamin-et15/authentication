const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//db connecting
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Authentication");
        console.log("Database is connected! happy programming...");
    } catch (error) {
        console.log("not connected DB");
        console.log(error);
        process.exit(1);
    }
};

app.listen(PORT, async()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    await connectDB();
});