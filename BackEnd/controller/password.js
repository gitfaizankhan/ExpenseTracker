const { json } = require('body-parser');
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
        htmlContent: `<h1>http://localhost:3000/password/resetpassword/96c81373-6d2b-452f-a65d-6ce77e457e39</h1>`,
        params: {
            role: 'Frontend',
        },

    })
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

        ////
    const forgetuser = await user.findOne({
            where: {
                email: forgetemail
            }
        });
    // const forgetuser = await forget.findOne({
    //     where: {
    //         email: forgetemail
    //     }
    // });

    const resetRequest = await forget.create({ userId: forgetuser.id, isactive: true});
    console.log(resetRequest);
    console.log("Everything is good");
}


exports.resetpassword = async (req, res)=>{
    const id = req.user.id;
    const expenseData = await expense.findByPk( id);
    console.log(id)
}