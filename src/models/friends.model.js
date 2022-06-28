"use strict";


const Friends=(sequelize,DataTypes)=>sequelize.define('friends',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports=Friends;