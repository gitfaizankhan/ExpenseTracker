const Sib = require('sib-api-v3-sdk');
const forget = require('../models/forgetpassword')
const user = require('../models/user')
const bcrypt = require('bcrypt');

require('dotenv').config()


exports.forgetPassword = async (req, res) => {
    console.log("asdfgh ", req.body)
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
    console.log("name", forgetId.id);
    res.status(200).json(forgetId);
}


exports.resetpassword = async (req, res)=>{
    const id =  req.body.forgetid;
    const userexist = await forget.findByPk(id); 
    console.log("UserExist ", userexist);
    if(userexist.isactive){
        const password = req.body.password;
        console.log("userexist.id", userexist.userId);
        console.log("password ", password);
        const salt = 5;
        await bcrypt.hash(password, salt, async (err, hash) => {
            let resultData = await user.update({ password: hash }, { where: { id: userexist.userId } });
            console.log(resultData)
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