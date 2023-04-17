const express = require('express');
var bodyParser = require('body-parser'); // get value from (x-www-form-urlencoded)
const { PORT, BASE_URL } = require('./config/key');
const authRouter = require('./routes/api.master.route');
var cors = require ('cors');  //
var multipart = require('connect-multiparty'); // get value from (form-data) 
const { db } = require('./utils/db.utill'); // database connection


const app = express();


global.app = module.exports = express();

//configure public folder in express
app.use(express.static('public'));
app.use(cors())

// body parser
app.use(multipart());
app.use(express.json()); //get value from (raw)
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Set local storage
app.use((req, res, next)=> {
    res.locals.BASE_URL = BASE_URL;
    next();
})

app.use('/api', authRouter);


// Listen Port
app.listen(PORT, async()=> {
    try {
        await db.authenticate();
        await db.sync({ alter: true })
        console.log(`Port is running on ${PORT}`)
    }catch(error) {
        console.error('Unable to connect to the database:', error);
        process.exit();
    }
});