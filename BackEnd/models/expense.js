const Sequelize = require('sequelize');
const dbConnection = require('../utils/dbConnection');

const expenseSchema = dbConnection.define('expenses', {
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