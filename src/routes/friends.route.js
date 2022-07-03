"use strict";

const express=require("express");
const {Friends}=require("../models/index.js");

const router=express.Router();

router.get('/friends',getAllFriends);

router.get('/friends/:id',getFriendByNumber);

router.post('/friends',addFriends);

router.put('/friends/:id',updateFriend);

router.delete('/friends/:id',deleteFriend);

async function deleteFriend(req,res){
    let fid=parseInt(req.params.id);
    let friend=await Friends.destroy({where:{id:fid}});
    // res.send(friend);
    res.send("Done")
}

async function updateFriend(req,res){
    let fid=parseInt(req.params.id);
    let pre=await Friends.findOne({where:{id:fid}});
    let friend=await Friends.upsert({
        id:fid,
        name:req.body.name,
        number:pre.number
    });
    res.json(friend);
}

async function getFriendByNumber(req,res){
    let fid=parseInt(req.params.id);
    let friend=await Friends.findOne({where:{id:fid}});
    res.json(friend);
}

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