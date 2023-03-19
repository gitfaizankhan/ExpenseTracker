const express = require('express');
const userController = require('../controller/password');
const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/forgotpassword', userController.forgetPassword);

router.post('/resetpassword',  userController.resetpassword);


module.exports = router;