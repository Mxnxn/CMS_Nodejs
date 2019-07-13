const express = require('express');
var app = express.Router();
var Post = require('../../models/Post');
var DBAdmin = require('../../models/DBAdmin')
const Joi = require('@hapi/joi');
const {regValidation,loginValidation} = require('../api/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'get';
    next();
});

app.get('/',(req,res)=>{
    Post.find({}).then(posts=>{
        res.send(posts);
    })  
});

app.post('/reg', async (req,res)=>{

    const {error} = regValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if email is exist or not

    const emailExist = await DBAdmin.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exist');

    // Hash passwords

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // storing to db atlas

    const dbadmin = new DBAdmin({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    
    try{
        const savedUser = await dbadmin.save();
        res.send({'user' : savedUser._id});
    }catch(err){
        res.status(400).send(err);
    }
});

app.post('/login', async (req,res)=>{

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userCredetial = await DBAdmin.findOne({email:req.body.email});
    if(!userCredetial) return res.status(400).send('Email or Password is Wrong');

    const validPassword = await bcrypt.compare(req.body.password,userCredetial.password);
    if(!validPassword) return res.status(400).send('Invalid Password!');

    //create an assign a token!
    const token = jwt.sign({_id : userCredetial._id },process.env.TOKEN);
    res.header('auth-token',token).send(token);
    
    // res.send({'user' : userCredetial});

});

module.exports = app;