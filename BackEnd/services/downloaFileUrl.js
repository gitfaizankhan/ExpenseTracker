const getDb = require('../utils/dbConnection').getDb;
const FileUrls = require('../models/fileUrlSave');

exports.addFileUrl = async() =>{
    const db = getDb();
    const fileurlData = new FileUrls(data);
    const addFile = await db.collection('fileUrls').insertOne(fileurlData);
    return addFile; 
}

exports.findAll = async(userId) =>{
    const db = getDb();
    const findFileUrl = await db.collection('fileUrls').find({ userId: userId }).toArray();
    return findFileUrl;
}