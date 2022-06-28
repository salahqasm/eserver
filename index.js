
require("dotenv").config();

const server=require("./src/server.js");
const {db}=require("./src/models/index.js")


db.sync().then(()=>{
    server.start(process.env.PORT || 3001);
    console.log(`Database Connected Successfuly..............`);
})