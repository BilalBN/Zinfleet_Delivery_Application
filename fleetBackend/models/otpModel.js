const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); 
const Otp = sequelize.define("otp",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type :{
        type:DataTypes.STRING,
        allowNull:false
    },
    receiver:{
        type:DataTypes.STRING,
        allowNull:false
    },

    otp:{
       type: DataTypes.INTEGER,
       allowNull: false     
    },
    expire:{
        type:DataTypes.DATE,
        allowNull:false
    },
    isUsed :{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
},{
    timestamps: true,
    tableName: "otp"
});

module.exports = Otp


