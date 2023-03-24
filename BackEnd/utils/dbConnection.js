// Create Expense Tracker Database

const Sequelize = require('sequelize');
require('dotenv').config()

const dbConnection = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.PASSWORD, 
    {
        dialect:'mysql', host:process.env.HOST
    }
);

module.exports = dbConnection;