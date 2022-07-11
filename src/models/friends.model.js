"use strict";


const Friends=(sequelize,DataTypes)=>sequelize.define('friends',{
    username:{
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports=Friends;