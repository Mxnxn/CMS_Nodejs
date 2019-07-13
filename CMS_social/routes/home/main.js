const express = require('express');
var app = express.Router();
var Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');


app.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

app.get('/',(req,res)=>{

    Post.find({}).then(posts=>{
        Category.find({}).then(cat=>{
            res.render('home/index',{posts:posts,category:cat});
        })
    });
   //how to use SESSIONS
   
    // req.session.mxnxn = 'Mxnxn';

    // if(req.session.mxnxn){
    //     console.log('we Found'+`${req.session.mxnxn}`);
    // }

});

app.get('/readmore/:id',(req,res)=>{

    Post.findOne({_id:req.params.id}).then(posts=>{
        res.render('home/detail',{posts:posts})
    });

});

app.get('/about',(req,res)=>{
    res.render('home/about');
});

app.get('/login',(req,res)=>{
    res.render('home/login');
});
app.get('/register',(req,res)=>{
    res.render('home/register');
});

app.post('/register',(req,res)=>{

    const mUser = User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    });


    mUser.save();

    res.redirect('home/login');
});

module.exports = app;

app.get('/',(req,res)=>{

    res.render('home/index');
});

