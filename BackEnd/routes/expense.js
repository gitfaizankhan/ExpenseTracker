const express = require('express');
const expenseController = require('../controller/expense');

const userauthenticate = require('../middleware/auth')


const router = express.Router();

router.post('/addExpense', userauthenticate,  expenseController.addExpense);

router.get('/getExpense', expenseController.getExpense);

router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;