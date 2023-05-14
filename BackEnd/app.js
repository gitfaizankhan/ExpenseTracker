const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./utils/dbConnection').MongoClient;
const userRoute = require('./routes/users');
const expenseRoute = require("./routes/expense");
const purchaseRoute = require('./routes/premium');
const passwordroute = require('./routes/password');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

const logStream = fs.createWriteStream('./logs/access.log', { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.use('/user', userRoute);
app.use('/expense', expenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/password', passwordroute);

dbConnection(()=>{
    app.listen(process.env.PORT, () => {
        console.log('server is running on http://localhost:3000/')
    });
})