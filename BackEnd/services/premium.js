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