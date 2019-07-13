const app = require('express').Router();
const verify = require('./verifytoken');

app.get('/:token',verify,(req,res)=>{
    res.json({posts:{title:'my First Post',description : 'DESC'}})
});

app.get('/',verify,(req,res)=>{
    res.json({posts:{title:'my First Post',description : 'DESC'}})
});

module.exports = app;