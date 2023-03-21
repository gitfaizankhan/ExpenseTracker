const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./utils/dbConnection');
const userRoute = require('./routes/users');
const expenseRoute = require("./routes/expense");
const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/purchaseData');
const purchaseRoute = require('./routes/purchase');
const ForgetPassword = require('./models/forgetpassword');
const passwordroute = require('./routes/password');
const FileUrl = require('./models/fileUrlSave');


const app = express();

;


// test
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.use('/user', userRoute);
app.use('/expense', expenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/password', passwordroute);

User.hasMany(Expense);
Expense.belongsTo(User) 

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgetPassword)
ForgetPassword.belongsTo(User)

User.hasMany(FileUrl)
FileUrl.belongsTo(User)


async function syncDB() {
    try {
        // await dbConnection.sync({ force: true });
        await dbConnection.sync();
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}
syncDB();

app.listen(3000, ()=>{
    console.log('server is running on http://localhost:3000/')
});