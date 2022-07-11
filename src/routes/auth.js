'use strict';
const express=require("express");
const bcrypt=require("bcrypt");
const base64=require("base-64")
const router=express.Router();
const {Friends}=require("../models/index.js");

router.post('/signup',signUp);
router.post('/signin',signIn);


async function signUp(req,res){
    let {username,password}=req.body;
    let hashed=await bcrypt.hash(password,5);
    let user=await Friends.findOne({where:{username:username}});
    if(!user){
        try{
            await Friends.create({
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
        try{
            let user=await Friends.findOne({where:{username:username}});
            if(user){
                let valid=await bcrypt.compare(hashedPassword,user.password);
                if(valid){
                    res.status(200).send(`welcome ${user.username}!!`);
                }
                else{
                    res.status(409).send("Wrong Password ..!");
                }
            }else{
                res.status(409).send("user is not found! please signup");
            }
        }catch(err){
            console.log(err);
        }
    }


}


module.exports=router;