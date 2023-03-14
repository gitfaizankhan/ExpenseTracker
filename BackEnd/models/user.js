const { Sequelize } = require('sequelize');
const dbConnection = require('../utils/dbConnection');

const userSchema = dbConnection.define('user', {
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
    ispremiumuser: Sequelize.BOOLEAN
});

module.exports = userSchema;