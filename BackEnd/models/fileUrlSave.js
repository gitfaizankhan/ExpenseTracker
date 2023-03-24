// Previous Downloaded Files Details Database Table

const Sequelize = require('sequelize');
const dbConnection = require('../utils/dbConnection');
require('dotenv').config()

const fileUrl = dbConnection.define(process.env.FILE_URL_SAVE , {

    url:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = fileUrl;