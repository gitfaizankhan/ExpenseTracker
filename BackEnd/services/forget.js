const getDb = require('../utils/dbConnection').getDb;
const ForgetModel = require('../models/forgetpassword');

exports.addForgetPassword = async (data) =>{
    const db = getDb();
    const forget = new ForgetModel(data);
    const addForget = await db.collection('forgetpassword').insertOne(forget);
    return addForget;
}

exports.getForgetPassword = async (key, value) =>{
    const db = getDb();
    let forgetData = {};
    forgetData[key] = value;
    const getForget = await db.collection('forgetpassword').findOne(forgetData);
    return getForget;
}

exports.updateForgetPassword = async(key, value, status) =>{
    const db = getDb();
    let forgetData = {};
    forgetData[key] = value;
    const getForgetUpdate = await db
        .collection('forgetpassword')
        .updateOne(
            forgetData,
            {
                $set: { isactive: status }
            }
        );
    return getForgetUpdate
}

