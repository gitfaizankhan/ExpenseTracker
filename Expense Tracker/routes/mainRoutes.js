const express = require('express');
const signupController = require('../controller/signUp_In');

const router = express.Router();

router.post('/sign-up',signupController.sign_up );

router.post('/signin', signupController.login);

module.exports = router;