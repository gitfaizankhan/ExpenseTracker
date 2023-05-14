// User Expense Routes 
// Add, Get, Delete, Download

const express = require('express');
const expenseController = require('../controller/expense');
const downloadfile = require('../controller/download')
const auth = require('../middleware/auth');


const router = express.Router();

// Add
router.post('/addExpense', auth.userAuth, expenseController.postExpense);

// Get
router.get('/getExpense', auth.userAuth,   expenseController.getExpense);

// Delete
router.delete('/delete/:id', auth.userAuth,  expenseController.deleteExpense);

// Download Data in File Format
// router.get('/download', auth.userAuth, downloadfile.downloadData);

// Downloaded Files Url
// router.get('/downloadfileurl', auth.userAuth, downloadfile.fileurl)

module.exports = router;