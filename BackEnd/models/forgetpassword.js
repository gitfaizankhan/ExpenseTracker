const Sequelize = require('sequelize');
const dbConnection = require('../utils/dbConnection');
const { v4: uuidv4 } = require('uuid');

const forgetPassword = dbConnection.define('forgetPassword', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
   userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isactive: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = forgetPassword;