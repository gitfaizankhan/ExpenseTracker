const getDb = require('../utils/dbConnection').getDb;
const mongodb = require('mongodb');
const Expense = require('../models/expense');
const userTotalExpense = require('../services/user');

exports.addExpense = async (expenseData, user) => {
    try{
        const db = getDb();
        let amount = expenseData.amount;
        let description = expenseData.description;
        let category = expenseData.category;
        let userId = user._id;
        const expense = new Expense({ amount: amount, description: description, category: category, userId: userId });
        const insertResult = db.collection('expenses').insertOne(expense);
        
        const totalExpenseData = user.totalExpense + +amount;
        userTotalExpense.updateUser("totalExpense", totalExpenseData, userId);
        return insertResult;
    }catch(error){
        throw error;
    }
}


exports.getExpense = async(ITEM_PER_PAGE, skipRecords, userId) =>{
    const db = getDb();
    return await db
        .collection('expenses')
        .find({ userId: new mongodb.ObjectId(userId) })
        .skip(skipRecords)
        .limit(ITEM_PER_PAGE)
        .toArray();
}


exports.findExpense = async (expenseId) => {
    const db = getDb();
    return await db
        .collection('expenses')
        .find({ _id: new mongodb.ObjectId(expenseId) })
        .toArray();
}

exports.findExpenseByUserID = async (userId) => {
    const db = getDb();
    return await db
        .collection('expenses')
        .find({ userId: userId})
        .toArray();
}

exports.count = async(userId) =>{
    const db = getDb();
    return await db
        .collection('expenses')
        .countDocuments({userId: new mongodb.ObjectId(userId)});
}

exports.deleteExpense = async(expenseId, userId) =>{
    const db = getDb();
    const isExpenseDeleted = await db.collection('expenses').deleteOne({ _id: new mongodb.ObjectId(expenseId), userId: new mongodb.ObjectId(userId) });
    // console.log("isExpenseDeleted ", isExpenseDeleted);
    return isExpenseDeleted.deletedCount > 0;
}

