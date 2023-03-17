const express = require('express');
const userController = require('../controller/user');


const router = express.Router();

router.post('/sign-up', userController.sign_up);

router.post('/signin', userController.login);


module.exports = router;