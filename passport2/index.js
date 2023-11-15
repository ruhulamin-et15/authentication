const app = require("./app");
const connectDB = require("./config/database");


const port = 4000;

app.listen(port, async ()=>{
    console.log(`server running at http://localhost:${port}`);
    await connectDB();
});