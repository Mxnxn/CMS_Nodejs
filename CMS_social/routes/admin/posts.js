const express = require('express');
const Post = require('../../models/Post');
var app = express.Router();
var https = require('https');
const {isEmpty} = require('../../helps/upload-helper');
const Category = require('../../models/Category');


app.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

app.get('/',(req,res)=>{
    Post.find({})
    .populate('category')
    .then(posts=>{
        res.render('admin/posts/create',{posts : posts});
    });
})

app.get('/create',(req,res)=>{

    Category.find().then(cat=>{
        res.render('admin/posts/index',{category:cat});
    })
});

app.post('/posted',(req,res)=>{   

    let er = [];
    
    if(!req.body.title){
        er.push({message:'Please Enter Title'});
        console.log(er);
    }
    if(!req.body.desc){
        er.push({message:'Please Enter Description'});
    }

    if(req.body.desc >= 0 || req.body.desc <20){
        er.push({message:'Description should be 20 chars'});
    }

    if(er.length>0){
        // console.log(er[0]);
        Category.find().then(cat=>{
            res.render('admin/posts/index',{
                errors:er,category:cat
            });
        });
    } else {
        
        let filename = 'not uploaded'   
        let dirUpload = "";

        if(!isEmpty(req.files)){
            
            let file = req.files.file;
            filename = file.name;

            file.mv('./public/uploads/'+filename,(err)=>{
                if(err) throw err;
            });
        }

        let mallow = true;

        if(req.body.allow){
            mallow = true;
        }else{
            mallow = false;
        }
        
        const newPost = Post({
            title: req.body.title,
            status: req.body.status,
            desc: req.body.desc,
            allow: mallow,
            file:filename,
            category:req.body.category
        });

        newPost.save().then(savedPost =>{
            // console.log(savedPost);
            
            req.flash('success_edit','Post Created Successfully!')
            
            res.redirect('/admin/posts/');

            // let url = 'https://api.telegram.org/bot794119558:AAGopZT_UHdRU1NHA9y2YbOXFJFrS1-jPEE/sendMessage?chat_id=595358456&text='+savedPost.title+"%0A"+savedPost.status+"%0A"+savedPost.allow+"%0A"+savedPost.desc;
            // https.get(url,(res)=>{
                
            //     res.on('end',()=>{
            //         // body = JSON.parse(body);
            //         console.log('SENT ! ');    
            //     });
            // });
        }).catch(error =>{
            console.log('ERROR'+error);
        });    
        
        
        
    }
        
});

app.get('/edits/:id',(req,resp)=>{

    // resp.render('admin/posts/edit');

    Post.findOne({_id: req.params.id}).then(Posted=>{
        Category.find({}).then(cat=>{
            resp.render('admin/posts/edit',{posts: Posted,category:cat});
        })
    })    

});

app.put('/edits/:id',(req,respo)=>{
    Post.findOne({_id: req.params.id})
        .then(Posted=>{
            
            let mallow = true;

            if(req.body.allow){
                mallow = true;
            }else{
                mallow = false;
            }
            
        
            Posted.title = req.body.title,
            Posted.status = req.body.status,
            Posted.desc = req.body.desc,
            Posted.allow =  mallow,
            Posted.category = req.body.category

            Posted.save().then(updatedPost=>{
                
                req.flash('success_edit','Post Edited Successfully');

                respo.redirect('/admin/posts/');   
                // respo.writeHead(302,{'Location':'/admin/posts/'});
                // respo.end();
            });
        });
});

app.get('/delete/:id',(req,respo)=>{


    Post.deleteOne({ _id: req.params.id}).then(()=>{

        req.flash('success','Post Deleted Successfully');
    
        respo.redirect('/admin/posts/');
    
    });
});

module.exports = app;