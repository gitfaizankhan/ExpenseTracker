const expense = require('express');

const purchaseController = require('../controller/purchase')

const auth = require('../middleware/auth');

const router = expense.Router();

router.get('/premium_member', auth, purchaseController.purchasepremium);

router.post('/update_transaction_status', auth, purchaseController.transactionStatus);

router.get('/showleaderboard' , purchaseController.showleaderboard);


module.exports = router;