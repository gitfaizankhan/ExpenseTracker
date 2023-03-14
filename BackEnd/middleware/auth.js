const jwt = require('jsonwebtoken');

const User = require('../models/user');
require('dotenv').config();

const userAuth = async (req, res, next)=>{
    try{
        const token = req.header('authorization');
        const userData = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findByPk(userData.userId);
        req.user = user;
        console.log("My sahfks ", token);
        next();
    }catch(error){
        console.log(error);
    }
}

module.exports = userAuth;