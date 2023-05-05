// Password Update Routes 

const express = require('express');
const userController = require('../controller/password');
const userAuth = require('../middleware/auth');

const router = express.Router();

// Create Forget Request
router.post('/forgotpassword', userController.forgetPassword);

// // Reset Password
router.post('/resetpassword',  userController.resetpassword);


module.exports = router;