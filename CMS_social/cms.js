const express = require('express');
const httpx = require('https');
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const {select} = require('./helps/helper');
const MO = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');

dotenv.config();


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/cms',{useNewUrlParser:true}).then((db)=>{
//     console.log('MONGO CONNECTED');
// }).catch(error => console.log("NOT CONNECTED"+error));

mongoose.connect(process.env.DB_CONN
    ,{useNewUrlParser:true}).then((db)=>{
    console.log('Connected');
}).catch(error=>console.log("Lost Connection : "+error))

const app = express();

app.use(session({
    secret:'Mxnxnn',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.success_edit = req.flash('success_edit'); 
    res.locals.mreq = req.flash('mreq');  
    next(); 
});

app.engine('handlebars',exphbs({defaultLayout:'admin',helpers: {select :select}}));

app.set('view engine','handlebars');

app.use(upload());
app.use(express.static(path.join(__dirname,'public'))); 

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json()); 

app.use(MO('_method'));



// loading routes
const home = require('./routes/home/main');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const category = require('./routes/admin/category');
const api = require('./routes/api/api');
const apiuser = require('./routes/api/user');


// using routes
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/category',category);
app.use('/api',api);
app.use('/api/user',apiuser);






app.listen(8888,()=>{
      console.log('listening');
});


