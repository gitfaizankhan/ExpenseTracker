// User Expense Store Database Table

const Sequelize = require('sequelize');
const dbConnection = require('../utils/dbConnection');

require('dotenv').config();

const expenseSchema = dbConnection.define(process.env.EXPENSE_TABLE , {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = expenseSchema;