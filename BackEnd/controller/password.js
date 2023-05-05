const Sib = require('sib-api-v3-sdk');
const forget = require('../services/forget')
const user = require('../services/user')
const monodb = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config()


// Active forget password id
exports.forgetPassword = async (req, res) => {
    const forgetemail = req.body.email;

    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME,
    }

    const receivers = [
        {
            email: `${forgetemail}`,
        },
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'no-reply',
        textContent: `forget password`,
        htmlContent: `<a href="${process.env.FORGET_PASSWORD_PAGE}">click here</a>`,
        params: {
            role: 'Frontend',
        },

    })
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    const forgetuser = await user.getUser(forgetemail);
    const userexist = await forget.getForgetPassword('userId', forgetuser._id);
    if (userexist) {
        await forget.updateForgetPassword('userId', forgetuser._id, true);
    } else {
        await forget.addForgetPassword({ userId: forgetuser._id, isactive: true });
    }
    const forgetId = await forget.getForgetPassword('userId', new monodb.ObjectId(forgetuser._id));
    res.status(200).json(forgetId);
}

// reset password
exports.resetpassword = async (req, res)=>{
    const id =  req.body.forgetid;
    const userexist = await forget.getForgetPassword('_id', id); 
    if(userexist.isactive){
        const password = req.body.password;
        const salt = 5;
        await bcrypt.hash(password, salt, async (err, hash) => {
            await user.updateUser('password', hash, userexist.userId);
        });
        const data = await forget.updateForgetPassword('_id', id, false);
        res.status(200).json(data);
    }else{
        res.status(404).json({
            success: false,
            message: "User Has Expire. Go to login & Try Again"
        })
    }
    
}