// Registered Users Personal Details Database Table 

const { Sequelize } = require('sequelize');
const dbConnection = require('../utils/dbConnection');
require('dotenv').config()

const userSchema = dbConnection.define(process.env.USER_LOGIN, {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    ispremiumuser:{
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    totalexpense:{
        type: Sequelize.INTEGER
    }
});

module.exports = userSchema;