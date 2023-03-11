const signup = require('../models/signup');
const bcrypt = require('bcrypt');

exports.sign_up = async (req, res, next)=>{
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        const salt = 5; 
        bcrypt.hash(password, salt, async (err, hash)=>{
            let resultData = await signup.create({
                name: name,
                email: email,
                password: hash
            });
            res.json(resultData);
        });
    }catch(err){
        res.status(403).json(err);
    }
}

exports.login = async (req, res, next)=>{
    try{
        let loginEmail = req.body.email;
        let loginPass = req.body.password;
        let userExist = await signup.findOne({where:{
            email: loginEmail
        }});
        if (userExist !== null){
            if (bcrypt.compareSync(loginPass, userExist.password)){
                res.status(200).json({
                    message: "User Logged in successfully",
                    success: true
                });
            }else{
                res.status(401).json({
                    message: "User not authorized",
                    success: false
                });
            }
        }else{
            res.status(404).json({
                message: "User Not Found",
                success: false
            });
        }
    }catch(error){
        console.log(error);
    }
}
