"use strict";

const {Sequelize,DataTypes}=require("sequelize");
const Friends=require("./friends.model.js");
const psql=process.env.DATABASE_URL

const sequelize=new Sequelize(psql,{});

module.exports={
    db:sequelize,
    Friends:Friends(sequelize,DataTypes)
}