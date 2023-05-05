// // Premium User Features
// // Transaction Details And Leaderboard

const express = require('express');
const purchaseController = require('../controller/premium')
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/premium_member', auth.userAuth, purchaseController.purchasepremium);

router.post('/update_transaction_status', auth.userAuth, purchaseController.transactionStatus);

router.get('/showleaderboard', auth.userAuth,  purchaseController.showleaderboard);


module.exports = router;