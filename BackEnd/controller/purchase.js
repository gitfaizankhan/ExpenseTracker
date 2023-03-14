const Razorpay = require('razorpay');
const Order = require('../models/purchaseData');

exports.purchasepremium = async (req, res)=>{
    console.log("asdfgh asdfg ", req.user);
    console.log(process.env.RAZORPAY_KEY_ID);
    try{
        var razp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        
        const amount = 100;
        await razp.orders.create({ amount, currency: "INR"}, (err, order)=>{
            if(err){
                console.log(err);
                // throw new Error(JSON.stringify(err));
            }
            Order.create({orderid: order.id, status: 'PENDING'}).then(()=>{
                return res.status(201).json({order, key_id: razp.key_id});
            }).catch(err=>{
                throw new Error(err);
            });
        })
        // console.log("name ",name);
    }catch(error){
        res.status(403).json({message:'Something went wrong', error: error})
    }
}


exports.transactionStatus = async (req, res)=>{
    try{
        const {payment_id, order_id} = req.body;
        Order.findOne({ where: { orderid: order_id}})
        .then((order)=>{
            order.update({paymentid: payment_id, status: 'SUCCESSFUL'})
            .then(()=>{
                req.user.update({ ispremiumuser : true})
                .then(()=>{
                    return res.status(202).json({
                        success: true,
                        message: 'Transaction Successful'
                    }).catch((error)=>{
                        throw new Error(error);
                    });
                }).catch((error)=>{
                    throw new Error(error);
                });
            }).catch((error) => {
                throw new Error(error);
            });
        })
    }catch(error){
        console.log(error);
    }
}