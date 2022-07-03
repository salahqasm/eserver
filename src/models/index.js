"use strict";

const {Sequelize,DataTypes}=require("sequelize");
const Friends=require("./friends.model.js");
const psql=process.env.DATABASE_URL

let sequelizeOptions={
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
}

const sequelize=new Sequelize(psql,sequelizeOptions);

module.exports={
    db:sequelize,
    Friends:Friends(sequelize,DataTypes)
}