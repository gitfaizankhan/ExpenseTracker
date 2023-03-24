const Sib = require('sib-api-v3-sdk');
const forget = require('../models/forgetpassword')
const user = require('../models/user')
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

        // 
    const forgetuser = await user.findOne({ where: { email: forgetemail } });
    const userexist = await forget.findOne({ where: { userId: forgetuser.id } });
    if (userexist) {
        await forget.update({ isactive: true }, { where: { userId: forgetuser.id } });
    } else {
        await forget.create({ userId: forgetuser.id, isactive: true });
    }
    const forgetId = await forget.findOne({ where: { userId: forgetuser.id } });
    res.status(200).json(forgetId);
}

// reset password
exports.resetpassword = async (req, res)=>{
    const id =  req.body.forgetid;
    const userexist = await forget.findByPk(id); 
    if(userexist.isactive){
        const password = req.body.password;
        const salt = 5;
        await bcrypt.hash(password, salt, async (err, hash) => {
            await user.update({ password: hash }, { where: { id: userexist.userId } });
        });
        const data = await forget.update({ isactive: false }, { where: { id: id } });
        res.status(200).json(data);
    }else{
        res.status(404).json({
            success: false,
            message: "User Has Expire. Go to login & Try Again"
        })
    }
    
}