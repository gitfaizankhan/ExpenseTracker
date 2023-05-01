
const jwt = require('jsonwebtoken');
const users = require('../services/user');
const bcrypt = require('bcrypt');
require('dotenv').config()

// Register New User
exports.sign_up = async (req, res, next)=>{
    try{
        const resultData = users.addUser(req.body);
        res.status(200).json(resultData);
    }catch(err){
        res.status(403).json(err);
    }
}

// Generate JWT
function generateJWT(id){
    return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
};


// Login User
exports.login = async (req, res, next)=>{
    try{
        let loginEmail = req.body.email;
        let loginPass = req.body.password;
        let userExist = await users.getUser(loginEmail);

        if (userExist !== null){
            if (bcrypt.compareSync(loginPass, userExist.password)){
                res.status(200).json({
                    message: "User Logged in successfully",
                    success: true,
                    token: generateJWT(userExist.id)
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



