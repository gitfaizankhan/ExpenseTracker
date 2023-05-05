const Razorpay = require('razorpay');
const premium = require('../services/premium');
const jwt = require('jsonwebtoken'); 
const user = require('../services/user');
const userAuthorized = require('../middleware/auth')


// purchase premium membership
exports.purchasepremium = async (req, res)=>{
    try{
        var razp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        // console.log("razp ", razp);
        const userId = req.user._id
        const amount = 100;  // 100 means 1rs
        const order = await razp.orders.create({ amount, currency: "INR"});
        // console.log(order);
        // res.json(order);
        // , async (err, order)=>{
        //     if(err){
        //         console.log(err);
        //         // throw new Error(JSON.stringify(err));
        //     }
        //     console.log("order.id, 'PENDING', userId, ", order, 'PENDING', userId);
        //     await premium.addPremiumPurchas(order.id, 'PENDING', userId);
            // return 
        res.status(201).json({order, key_id: razp.key_id});
        // });
    }catch(error){
        console.log("error ", error);
        res.status(403).json({message:'Something went wrong', error: error})
    }
}




// // update transaction status
exports.transactionStatus = async (req, res)=>{
    try{
        var razp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        // let order = await premium.findPaymentDetails(order_id);
        // const userId = req.user._id;
        // const userEmail = req.user.email;
        // let users = await premium.updatePaymentDetails(order.orderid,  payment_id, 'SUCCESSFUL' );
        // let update = await user.updateUser('isPremiumUser', true, userId);
        // return res.status(202).json({
        //         success: true,
        //         message: 'Transaction Successful',
        //         token: userAuthorized.generateJWT(userEmail)
        //     });
    }catch(error){
        console.log(error);
    }
}



// Show Premium User Leaderboard
exports.showleaderboard = async (req, res)=>{
    try{
        const data = await user.findAllUserExpense();
        res.status(200).json(data);
    }catch(error){
        console.log(error);
    }
}
