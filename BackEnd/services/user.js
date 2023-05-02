const getDb = require('../utils/dbConnection').getDb;
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.addUser = async (userData) => {
    const db = getDb();
    let name = userData.name;
    let email = userData.email;
    let password = userData.password;
    const salt = 5; 
    bcrypt.hash(password, salt, async (err, hash) => {
        const user = new User({ name: name, email: email, password: hash});
        return db
            .collection('users')
            .insertOne(user);
    });
}

exports.getUser = async (email) =>{
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email: email });
    return existingUser;
}

const updateUserTotalExpense = async (key, value, userId) => {
    console.log("key, value, userId, ",key, value, userId)
    const db = getDb();
    let updateTotalExpense = {};
    updateTotalExpense[key] = value;
    await db
        .collection('users')
        .updateOne(
            { _id: userId },
            {
                $set: updateTotalExpense
            }
        );
}

exports.updateUserTotalExpense = updateUserTotalExpense;