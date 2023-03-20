const express = require('express');
const expenseController = require('../controller/expense');
const downloadfile = require('../controller/downloadfile')
const userAuth = require('../middleware/auth');


const router = express.Router();

router.post('/addExpense', userAuth,  expenseController.addExpense);

router.get('/getExpense', userAuth,   expenseController.getExpense);

router.delete('/delete/:id', userAuth,  expenseController.deleteExpense);

router.get('/download', userAuth, downloadfile.downloadData);

module.exports = router;