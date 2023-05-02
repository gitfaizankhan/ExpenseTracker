const Razorpay = require('razorpay');
const premium = require('../services/premium');
const jwt = require('jsonwebtoken'); 
const user = require('../models/user');
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
        await razp.orders.create({ amount, currency: "INR"}, async (err, order)=>{
            if(err){
                console.log(err);
                // throw new Error(JSON.stringify(err));
            }
            
            await premium.addPremiumPurchas(order.id, 'PENDING', userId);
            return res.status(201).json({order, key_id: razp.key_id});
        });
    }catch(error){
        console.log("error ", error);
        res.status(403).json({message:'Something went wrong', error: error})
    }
}




// // update transaction status
// exports.transactionStatus = async (req, res)=>{
//     try{
//         const {payment_id, order_id} = req.body;
//         let order = await PaymentOrder.findOne({ where: { orderid: order_id}});

//         let users = await order.update({paymentid: payment_id, status: 'SUCCESSFUL'});
//         req.user.update({ ispremiumuser : true});
//         return res.status(202).json({
//                 success: true,
//                 message: 'Transaction Successful',
//                 token: userAuthorized.generateJWT(req.user.id)
//             });
//     }catch(error){
//         console.log(error);
//     }
// }


// // Show Premium User Leaderboard
// exports.showleaderboard = async (req, res)=>{
//     try{
//         const data = await user.findAll({
//             attributes:['name', 'totalexpense'],
//             group:['id'],
//             order: [[Sequelize.fn('SUM', Sequelize.col('totalexpense')), 'DESC']]
//         });
//         res.status(200).json(data);
//     }catch(error){
//         console.log(error);
//     }
// }
