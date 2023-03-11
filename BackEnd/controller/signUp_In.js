const signup = require('../models/signup');

exports.sign_up = async (req, res, next)=>{
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        let resultData = await signup.create({
            name: name,
            email: email,
            password: password
        });
        res.json(resultData);
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
            if(userExist.password === loginPass){
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
