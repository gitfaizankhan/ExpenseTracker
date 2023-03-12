const express = require('express');
const signupController = require('../controller/user');
const expenseController = require('../controller/expense');

const router = express.Router();

router.post('/sign-up',signupController.sign_up );

router.post('/signin', signupController.login);

router.post('/addExpense', expenseController.addExpense);

router.get('/getExpense', expenseController.getExpense);

router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;