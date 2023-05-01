const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isPremiumUser: {
    type: Boolean,
    default: false
  },
  totalExpense: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
