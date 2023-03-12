const expense = require('../models/expense');

exports.addExpense = async (req, res, next)=>{
    try{
        let amount = req.body.amount;
        let description = req.body.description;
        let category = req.body.category;

        let expenseResult = await expense.create({
            amount: amount,
            description: description,
            category: category
        });
        // console.log("expenseResult", expenseResult.data)
        res.status(200).json(expenseResult);
    }catch(error){
        res.status(403).json(error);
    }
}


exports.getExpense = async (req, res, next)=>{
    try{
        const expenseData = await expense.findAll();
        res.status(200).json(expenseData);
    }catch(error){
        res.status(403).json(error);
    }
}


exports.deleteExpense = async (req, res, next)=>{
    
    try{
        const id = req.params.id;
        const deleteResult = await expense.destroy({ where: { id: req.params.id } });
        res.status(200).json(deleteResult);
    }catch(error){
        res.status(403).json(error);
    }
}