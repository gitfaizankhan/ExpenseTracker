const Sequelize = require('sequelize');
const dbConnection = require('../utils/dbConnection');

const fileUrl = dbConnection.define('fileUrl', {

    url:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = fileUrl;