'use strict';
const express=require("express");
const bcrypt=require("bcrypt");
const base64=require("base-64")
const router=express.Router();
const {user}=require("../models/index.js");

router.post('/signup',signUp);
router.post('/signin',signIn);


async function signUp(req,res){
    let {username,password}=req.body;
    let hashed=await bcrypt.hash(password,5);
    let userD=await user.findOne({where:{username:username}});
    if(!userD){
        try{
            await user.create({
                username:username,
                password:hashed
            })
        }catch(err){
            console.log(err);
        }
        res.status(201).json(username);
    }else{
        res.status(409).send("failed");
    }
}


async function signIn(req,res){
    if(req.headers['authorization']){
        let base=req.headers.authorization.split(' ');
        let userpassEncoded=base.pop();
        let userpassDecoded=base64.decode(userpassEncoded).split(':');
        let [username,hashedPassword]=userpassDecoded;
        user.auth(username,hashedPassword).then(result=>{res.send(result)}).catch(err=>{throw err;})
    }else{
        res.send("Invalid signin trial")
    }


}


module.exports=router;