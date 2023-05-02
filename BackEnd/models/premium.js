const mongoose = require('mongoose');

const premiumPurchase = new mongoose.Schema({
    paymentid: {
        type: String,
        required: true,
        default: null
    },
    orderid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Premium = mongoose.model('PremiumPurchase', premiumPurchase);

module.exports = Premium;


