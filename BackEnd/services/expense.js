const getDb = require('../utils/dbConnection').getDb;

const Expense = require('../models/expense');

exports.addExpense = async (expenseData, user) => {
    // let userId = req.user._id;
    try{
        // console.log()
        const db = getDb();
        let amount = expenseData.amount;
        let description = expenseData.description;
        let category = expenseData.category;
        let userId = user._id;
        console.log("userId ", user);
// 
        const expense = new Expense({ amount: amount, description: description, category: category, userId: userId });
        db.collection('expenses').insertOne(expense);
        
        const totalExpenseData = user.totalExpense + +amount;
        await db
            .collection('users')
            .updateOne(
                { _id: userId },
                {
                    $set:
                        { totalExpense: totalExpenseData }
                }
            );
    }catch(error){
        throw error;
    }
}