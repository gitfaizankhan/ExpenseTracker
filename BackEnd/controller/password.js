const Sib = require('sib-api-v3-sdk');
const forget = require('../models/forgetpassword')
const user = require('../models/user')

require('dotenv').config()


exports.forgetPassword = async (req, res) => {
    const forgetemail = req.body.email;
    console.log(forgetemail)
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: 'faizankhaninfo9@gmail.com',
        name: 'faizan khan',
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
        htmlContent: `<a href="http://127.0.0.1:5500/view/login/forgetpassword.html">click here</a>`,
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
    console.log("name", forgetId);
    res.status(200).json(forgetId);
}


exports.resetpassword = async (req, res)=>{
    const id = req.user.id;
    const expenseData = await expense.findByPk( id);
    console.log(id)
}