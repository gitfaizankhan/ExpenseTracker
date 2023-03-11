const Sequelize = require('sequelize');

const dbConnection = new Sequelize('expense_tracker', 'root', 'root', 
    {
        dialect:'mysql', host:'localhost'
    }
);

module.exports = dbConnection;