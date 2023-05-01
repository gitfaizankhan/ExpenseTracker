const User  = require('../models/user');
const expense = require('../services/expense');

// Add User Expense
exports.postExpense = async (req, res, next)=>{
    try{
        await expense.addExpense(req.body, req.user);
        res.status(200).json(expenseResult);
    }
    catch(error){
        res.status(403).json(error);
    }
}

// // Get Current Login User Expense
// exports.getExpense = async (req, res, next)=>{
//     try{
//         const premium  = req.user.ispremiumuser;
//         let itemPage = req.header('items');
//         const page =   +req.query.page;
//         const ITEM_PER_PAGE = +itemPage;
//         let totalItems;
        
//         const total = await expense.count({ where: { userId: req.user.id }})
//         totalItems = total;
//         const e = await expense.findAll({ where: { userId: req.user.id } ,
//             offset: (page-1)* ITEM_PER_PAGE,
//             limit: ITEM_PER_PAGE
//         })
//         res.json({
//             expense: e,
//             premium: premium,
//             paginationDetails:{
//                 currentPage: page,
//                 hasNextPage: ITEM_PER_PAGE * page < totalItems,
//                 nextPage: page + 1,
//                 hasPreviousPage: page > 1,
//                 previousPage: page - 1,
//                 lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
//             }
//         })
//     }catch(error){
//         res.status(403).json(error);
//     }
// }

// // Delete User Expense
// exports.deleteExpense = async (req, res, next)=>{
    
//     try{
//         const userId = req.user.id;
//         const id = req.params.id;
//         let expenseAmount = req.user.totalexpense;

//         let getDeleteExpese = await expense.findByPk(id);
//         let totalexpensedata = expenseAmount - getDeleteExpese.amount;
        
//         await User.update({ totalexpense: totalexpensedata}, {where: { id: userId } });
        
//         const deleteResult = await expense.destroy({ where: {  id: id, userId: userId } });

//         if(deleteResult < 1){
//             res.status(403).json({ message: "Something Went Wrong", success: false});
//         }else{
//             res.status(200).json(deleteResult);
//         }
//     }catch(error){
//         res.status(403).json(error);
//     }
// }


