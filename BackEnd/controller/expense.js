const expense = require('../models/expense');
const User  = require('../models/user');

exports.addExpense = async (req, res, next)=>{
    const userId =  req.user.id;

    try{
        let amount = req.body.amount;
        let description = req.body.description;
        let category = req.body.category;

        let expenseResult = await expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: userId
        });
    const preexpenseAmount = await User.findByPk(userId, {
        attributes: ['id', 'totalexpense']
    });
        totalExpenseData = preexpenseAmount.totalexpense + +amount;
        console.log("asdf totalExpenseData", totalExpenseData);
    await User.update(
        { totalexpense: totalExpenseData },
        { where: { id: userId } }
    );
    res.status(200).json(expenseResult);
    }catch(error){
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