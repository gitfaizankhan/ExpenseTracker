const express = require('express');
const expenseController = require('../controller/expense');


const router = express.Router();

router.post('/addExpense', expenseController.addExpense);

router.get('/getExpense', expenseController.getExpense);

router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;