'use strict';
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { user } = require("../models/index.js");
//bearer token
module.exports = async (req, res, next) => {
    try{ if (req.headers['authorization']) {
        let tokenside = req.headers.authorization.split(' ')[1];
        let tokenAfterVerify = jwt.verify(tokenside, secret);

        let userFind = await user.findOne({ where: { username: tokenAfterVerify.username } });
        if (userFind) {
            req.user = userFind;
            next();
        } else {
            next("unvalid token!");
        }
    }else{
        next("unvalid auth process!");
    }
    }catch(err){
        next(err);
    }
}
