const jwt = require('jsonwebtoken');
const user = require('../services/user')

require('dotenv').config();

// User Auth with jwt
const userAuth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization');
        
        const userData = jwt.verify(token, process.env.TOKEN_SECRET)
        const loginUser = await user.getUser(userData.email);
        req.user = loginUser;
        next();
    }catch(error){
        console.log(error);
    }
}

module.exports = userAuth;