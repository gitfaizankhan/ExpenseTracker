const getDb = require('../utils/dbConnection').getDb;
const Premium = require('../models/premium');


exports.addPremiumPurchas = async (orderid, status, userId) =>{
    try{
        const db = getDb();
        const purchase = new Premium({ orderid: orderid, status: status, userId: userId });
        await db.collection('premium').insertOne(purchase);
    }catch(error){
        console.log(error);
    }
}


exports.findPaymentDetails = async(orderid) =>{
    const db = getDb();
    const findPaymant = await db.collection('premium').findOne({ orderid : orderid});
    return findPaymant;
}


exports.updatePaymentDetails = async(orderId, paymantId, status) =>{
    const db = getDb();
    const paymentData = { paymentid: paymantId, status: status }
    const updatePayment = await db
        .collection('premium')
        .updateOne(
            { 
                orderid: orderId 
            },
            {
                $set:paymentData
            } 
        );
    return updatePayment;
}