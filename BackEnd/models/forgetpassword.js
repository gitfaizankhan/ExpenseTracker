const mongoose = require('mongoose');

const forgetPassword = new mongoose.Schema({
    isactive: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const ForgetPassowrd = mongoose.model('ForgetPassword', forgetPassword);

module.exports = ForgetPassowrd;