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

exports.getUserID = async (userId) => {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ userId: userId });
    return existingUser;
}


const updateUser = async (key, value, userId) => {
    const db = getDb();
    let userData = {};
    userData[key] = value;
    await db
        .collection('users')
        .updateOne(
            { _id: userId },
            {
                $set: userData
            }
        );
}


const findAllUserExpense = async () => {
    try {
        const db = getDb();
        const result = await db.collection('users')
            .find({})
            .project({ name: 1, totalExpense: 1, _id: 0 })
            .sort({ totalExpense: -1 })
            .toArray();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}

exports.updateUser = updateUser;
exports.findAllUserExpense = findAllUserExpense;