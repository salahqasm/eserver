"use strict";

const {Sequelize,DataTypes}=require("sequelize");
const user=require("./user.model.js");
const psql=process.env.DATABASE_URL

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};

const sequelize=new Sequelize(psql,sequelizeOptions);

module.exports={
    db:sequelize,
    user:user(sequelize,DataTypes)
}