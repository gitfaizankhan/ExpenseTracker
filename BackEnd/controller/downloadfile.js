const expense = require('../models/expense')
const AWS = require('aws-sdk');
// AWS.config.paramValidation = false;

function uploadToS3(data, filename){
    const BUCKET_NAME = 'expensetrackerfiledata';
    const IAM_USER_KEY = 'AKIAZSMD75JSG3IJHCGO';
    const IAM_USER_SECRET = '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';

    try{
        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            // Bucket: BUCKET_NAME
        })

        s3bucket.createBucket(() => {
            var params = {
                Bucket: BUCKET_NAME,
                Key: `${filename}`,
                Body: data
            }
            s3bucket.upload(params, (err, s3response) => {
                if (err) {
                    console.log('Something Went Wrong', err);
                } else {
                    console.log('success', s3response);
                }
            })
        })
    }catch(error){
        console.log("Error ", error);
    }
}
exports.downloadData = async (req, res) => {
    const expenses = await expense.findAll({ where: { userId: req.user.id } });
    const stringifyedExpenses = JSON.stringify(expenses);
    const filename = 'expense.txt';
    const fileUrl = uploadToS3(stringifyedExpenses, filename);
    res.status(200).json({fileUrl, success:true});
}