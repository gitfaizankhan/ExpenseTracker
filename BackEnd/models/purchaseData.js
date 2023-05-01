const mongoose = require('mongoose');

const orderData = new mongoose.Schema({
    paymentid: {
        type: String,
        required: true
    },
    orderid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const OrderData = mongoose.model('Orders', orderData);

module.exports = OrderData;


