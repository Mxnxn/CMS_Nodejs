const express = require('express');
const Category = require('../../models/Category');
var app = express.Router();

app.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

app.get('/',(req,res)=>{
    // res.render('admin/category/index');
    Category.find().then(posts=>{
        res.render('admin/category/index',{posts:posts});
    })    
});

app.post('/create',(req,res)=>{
        
    let er = [];

    if(!req.body.name){
        er.push({message:'Please Enter name of Category you want to create.'})
    }

    if(er.length > 0){
        req.flash('mreq','Please enter name of Category you want to create.')
        res.redirect('/admin/category/')
    }else{
        const mCategory = new Category({
            name : req.body.name,
        });
        mCategory.save(saved =>{
            console.log(saved);
            res.redirect('/admin/category/')
        });
    }
       
});


app.get('/edit/:id',(req,res)=>{
    Category.findOne({_id:req.params.id}).then(update =>{

        res.render('admin/category/edit',{posts:update});

    });
});

app.put('/edit/:id',(req,res)=>{
    Category.findOne({_id:req.params.id}).then(update =>{
        update.name = req.body.name;
        update.save().then(saved=>{
            res.redirect('/admin/category/');
        });
    })
})



app.get('/delete/:id',(req,res)=>{
    Category.deleteOne({_id:req.params.id}).then(()=>{
        req.flash('success','Deleted Successful!');
        res.redirect('/admin/category/');       
    });
     

});

module.exports = app;

