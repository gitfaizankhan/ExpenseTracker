// User Expense Routes 
// Add, Get, Delete, Download

const express = require('express');
const expenseController = require('../controller/expense');
const downloadfile = require('../controller/download')
const userAuth = require('../middleware/auth');


const router = express.Router();

// Add
router.post('/addExpense', userAuth, expenseController.postExpense);

// Get
// router.get('/getExpense', userAuth,   expenseController.getExpense);

// Delete
// router.delete('/delete/:id', userAuth,  expenseController.deleteExpense);

// Download Data in File Format
// router.get('/download', userAuth, downloadfile.downloadData);

// Downloaded Files Url
// router.get('/downloadfileurl', userAuth, downloadfile.fileurl)

module.exports = router;