const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./utils/dbConnection');
const userRoute = require('./routes/mainRoutes');
const Expense = require('./models/expense');
const User = require('./models/user');



const app = express();

User.hasMany(Expense);
Expense.belongsTo(User);


// test
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', userRoute);



async function syncDB() {
    try {
        await dbConnection.sync({ force: true });
        // await dbConnection.sync();
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}
syncDB();

app.listen(3000, ()=>{
    console.log('server is running on http://localhost:3000/')
});