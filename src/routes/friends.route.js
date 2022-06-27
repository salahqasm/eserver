"use strict";

const express=require("express");

let router=express.Router();

router.get('/friends',(req,res)=>{
    res.send("Noor, Salah, Mohammad, Ahmad.")
})

module.exports=router;