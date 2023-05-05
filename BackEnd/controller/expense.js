const expense = require('../services/expense');
const userTotalExpense = require('../services/user');
// Add User Expense
exports.postExpense = async (req, res, next)=>{
    try{
        const expenseResult = await expense.addExpense(req.body, req.user);
        res.status(200).json(expenseResult);
    }
    catch(error){
        res.status(403).json(error);
    }
}

// Get Current Login User Expense
exports.getExpense = async (req, res, next)=>{
    try{
        const premium  = req.user.isPremiumUser;
        let itemPage = req.header('items');
        const page =   +req.query.page;
        const ITEM_PER_PAGE = +itemPage;
        let totalItems;
        const userId = req.user._id;
        const skipRecords = (page - 1)* ITEM_PER_PAGE;
        const getUserExpense = await expense.getExpense(ITEM_PER_PAGE, skipRecords, userId);

        const total = await expense.count(userId);
        totalItems = total;
        res.json({
            expense: getUserExpense,
            premium: premium,
            paginationDetails:{
                currentPage: page,
                hasNextPage: ITEM_PER_PAGE * page < totalItems,
                nextPage: page + 1,
                hasPreviousPage: page > 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
            }
        })
    }catch(error){
        res.status(403).json(error);
    }
}

// Delete User Expense
exports.deleteExpense = async (req, res, next)=>{
    
    try{
        const userId = req.user._id;
        const expenseId = req.params.id;
        let expenseAmount = req.user.totalExpense;
        let getDeleteExpese = await expense.findExpense(expenseId);
        let totalexpensedata = expenseAmount - getDeleteExpese[0].amount;
        const deleteResult = await expense.deleteExpense(expenseId, userId); 
        if (deleteResult){
            await userTotalExpense.updateUser("totalExpense", totalexpensedata, userId);
            res.status(200).json({ message: "Successfully Deleted", success: deleteResult });
        }else{
            res.status(403).json({ message: "Something Went Wrong", success: false });
        }
    }catch(error){
        res.status(403).json(error);
    }
}


