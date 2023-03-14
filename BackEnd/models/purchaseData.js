const Sequelize = require("sequelize")

const sequelize = require('../utils/dbConnection');

const orderData = sequelize.define('order', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = orderData;