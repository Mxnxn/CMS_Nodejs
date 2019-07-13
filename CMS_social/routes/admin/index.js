const express = require('express');
var app = express.Router();
const Post = require('../../models/Post');
const faker = require('faker');
const Category = require('../../models/Category');


app.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});


app.get('/',(req,res)=>{
    res.render('admin/index');
});

app.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard');
});

app.post('/generate-fakes',(req,res)=>{
    for(var i=0;i <= req.body.amount;i++){
        let posts = new Post();
        posts.title = faker.name.title();
        if(i%2 == 0){
            posts.status = 'public';
        }else{
            posts.status = 'private';
        }
        Category.find().then(cat=>{
            if(i%3 === 0){
                posts.category = 'PHP';
            }else if(i%3 === 1){
                posts.category = 'JS';
            }else{
                posts.category = 'Ruby';
            }
        })
        posts.desc = faker.lorem.word;
        posts.allow = true;

        posts.save().then(saved=>{});
        // console.log(posts);
    }
    res.writeHead(302,{'Location':'/admin/posts/'});
    res.end();
    
    // res.send(`working`)
})

module.exports = app;