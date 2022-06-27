"use strict";

const express=require("express");
const app=express();
const cors=require("cors");
const pageNotFound=require("./error-handlers/pageNotFound.js");
const serverError=require("./error-handlers/serverError.js");
const friendsRoute=require("./routes/friends.route.js");
const logger=require("./middlewares/logger.js");
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(friendsRoute);



app.get('/',(req,res)=>{
res.send("main test");
})










app.use('*',pageNotFound);
app.use(serverError);
const start=(port)=>{
    app.listen(port,()=>{
        console.log(`********************Server running on port: ${port}`);
    })
}


module.exports={
    app:app,
    start:start
}