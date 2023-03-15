const expense = require('../models/expense');
const User  = require('../models/user');
const sequelize   = require('../utils/dbConnection');

exports.addExpense = async (req, res, next)=>{

    const transaction = await sequelize.transaction();
    const userId =  req.user.id;

    try{
        let amount = req.body.amount;
        let description = req.body.description;
        let category = req.body.category;

        let expenseResult = await expense.create({amount, description, category, userId}, {transaction: transaction});
        totalExpenseData = req.user.totalexpense + +amount;
        await User.update({ 
            totalexpense: totalExpenseData 
        },{ 
            where: { id: userId }, transaction: transaction }
        );
        await transaction.commit();
        res.status(200).json(expenseResult);
    }catch(error){
        await transaction.rollback();
        res.status(403).json(error);
    }
}


exports.getExpense = async (req, res, next)=>{
    try{
        const premium  = req.user.ispremiumuser;
        const expenseData = await expense.findAll(
            { where:{userId: req.user.id}}
            );
        res.status(200).json({expenseData: expenseData, premium: premium});
    }catch(error){
        res.status(403).json(error);
    }
}


exports.deleteExpense = async (req, res, next)=>{
    
    try{
        const userId = req.user.id;
        const id = req.params.id;
        let expenseAmount = req.user.totalexpense;
        let getDeleteExpese = await expense.findByPk(id);
        let totalexpensedata = expenseAmount - getDeleteExpese.amount;
        await User.update({ totalexpense: totalexpensedata}, {where: { id: userId } });
        
        const deleteResult = await expense.destroy({ where: {  id: id, userId: userId } });
        if(deleteResult < 1){
            res.status(403).json({ message: "Something Went Wrong", success: false});
        }else{
            res.status(200).json(deleteResult);
        }
    }catch(error){
        res.status(403).json(error);
    }
}