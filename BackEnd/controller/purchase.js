const Razorpay = require('razorpay');
const Order = require('../models/purchaseData');
const jwt = require('jsonwebtoken'); 
const expense = require('../models/expense');
const user = require('../models/user');
const { Sequelize, Op } = require('sequelize');

exports.purchasepremium = async (req, res)=>{
    try{
        var razp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        
        const amount = 100;
        await razp.orders.create({ amount, currency: "INR"}, async (err, order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            await Order.create({orderid: order.id, status: 'PENDING'});
            return res.status(201).json({order, key_id: razp.key_id});
        });
    }catch(error){
        res.status(403).json({message:'Something went wrong', error: error})
    }
}

function generateJWT(id) {
    return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
};


exports.transactionStatus = async (req, res)=>{
    try{
        const {payment_id, order_id} = req.body;
        let order = await Order.findOne({ where: { orderid: order_id}});

        let users = await order.update({paymentid: payment_id, status: 'SUCCESSFUL'});
        req.user.update({ ispremiumuser : true});
        return res.status(202).json({
                success: true,
                message: 'Transaction Successful',
                token: generateJWT(req.user.id)
            });
    }catch(error){
        console.log(error);
    }
}


exports.showleaderboard = async (req, res)=>{
    try{
        const data = await user.findAll({
            attributes:['name', 'totalexpense'],
            group:['id'],
            order: [[Sequelize.fn('SUM', Sequelize.col('totalexpense')), 'DESC']]
        });
        res.status(200).json(data);
    }catch(error){
        console.log(error);
    }
}
