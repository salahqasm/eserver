"use strict";
require('dotenv').config();
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const user = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin', 'superuser'),
            defaultValue: 'user'
        },
        token: {
            type: DataTypes.VIRTUAL
        },
        actions:{
            type:DataTypes.VIRTUAL,
            get(){
                const acl={
                    user:['read','write'],
                    admin:['read','write','update','delete'],
                    superuser:['read','write','delete']
                }
                return acl[this.role];
            }
        }
    })
    user.auth = async function (username, hashedPassword) {
        try {
            let userD = await this.findOne({ where: { username: username } });
            if (userD) {
                let valid = await bcrypt.compare(hashedPassword, userD.password);
                if (valid) {
                    let newToken = jwt.sign({ username: userD.username }, secret)
                    userD.token = newToken;
                    return userD;
                }
                else {
                    return "wrong password!";

                }
            } else {
                return "invalid user!";
            }
        }
        catch (err) {
            return err;
        }
    }


    return user;
};

module.exports = user;