const expense = require('../services/expense')
const AWS = require('aws-sdk');
require('dotenv').config();
const fileUrlSave = require('../services/downloaFileUrl')

// upload data in file format -> S3(Simple Storage Service).
async function uploadToS3(data, filename) {
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,
    })
    var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${filename}`,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve, reject)=>{
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something Went Wrong', err);
                reject(err);
            } else {
                resolve(s3response.Location);
            }
        })
    })
}

// Download Expense Data  
exports.downloadData = async (req, res) => {
    try{
        const userId = req.user._id;
        const expenses = await expense.findExpenseByUserID(userId);
        const stringifyedExpenses = JSON.stringify(expenses);
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileUrl = await uploadToS3(stringifyedExpenses, filename);
        await fileUrlSave.addFileUrl({url: fileUrl, userId: userId});
        res.status(200).json({ fileUrl, success: true });
    }catch(error){
        console.log(error);
        res.status(500).json({fileUrl: '', success: false, error: error});
    }
}

// Will return all previous downloaded files url
exports.fileurl = async (req, res)=>{
    try{
        const userId = req.user._id;
        const urldata = await fileUrlSave.findAll(userId)
        res.status(200).json(urldata);
    }catch(error){
        console.log(error);
    }
}