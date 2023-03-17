const Sib = require('sib-api-v3-sdk');

require('dotenv').config()


exports.forgetPassword = (req, res) => {
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
            email: 'faizankcs099@gmail.com',
        },
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'no-reply',
        textContent: `forget password`,
        htmlContent: `<h1>Forgt Password</h1>`,
        params: {
            role: 'Frontend',
        },

    })
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    console.log("Everything is good");
}


exports.resetpassword = async (req, res)=>{
    const id = req.user.id;
    const expenseData = await expense.findByPk( id);
    console.log(id)
}