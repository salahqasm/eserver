"use strict";

const express=require("express");
const {Friends}=require("../models/index.js");
const { app } = require("../server.js");
const router=express.Router();

router.get('/friends',getAllFriends);

router.post('/friends',addFriends);





async function getAllFriends(req,res){
    let friends=await Friends.findAll();
    res.status(200).json(friends);
}

async function addFriends(req,res){
    let newFriend={name:req.body.name,number:req.body.number};
    let Friend=await Friends.create(newFriend);
    res.status(200).json(newFriend);
}

module.exports=router;