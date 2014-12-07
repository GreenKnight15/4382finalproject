var express = require("express");
var crypto = require("crypto");


module.exports = function(app){
 ///Authentication   
 var users = require("./controllers/users_controller.js");
    
    app.use('/static', express.static('./static')).
        use('/lib', express.static('../lib'));
        
    app.get('/',function(req,res){
        if(req.session.user){

            if(req.session.adminPass == "password"){
                res.render('prof',{
                username: req.session.username, 
                msg:req.session.msg,
                color:req.session.color,
                role:req.session.role,
                    
            });
                
            res.render('index',{
            username: req.session.username, 
            msg:req.session.msg,
            color:req.session.color,
            role:req.session.role,

            });
            
        }else{
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
        
        
    }});

    app.get('/user', function(req,res){
        if(req.session.user){
            res.render('user',{msg:req.session.msg});
        } else {
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    });
    
    app.get('/signup',function(req, res) {
        if(req.session.user){
            res.redirect('/');
        }
        res.render('signup',{msg:req.session.msg});
    });
    
    app.get('/login',function(req, res) {
        if(req.session.user){
            res.redirect('/');
        }
        res.render('login',{msg:req.session.msg});
    });
    
    app.get('/logout', function(req, res) {
        req.session.destroy(function(){
            res.redirect('/login');
        });
    });
    
    
    app.post('/signup', users.signup);
    app.post('/user/update', users.updateUser);
    app.post('/user/delete',users.deleteUser);
    app.post('/login', users.login); 
    app.get('/user/profile',users.getUserProfile);
//////end auth



var photos = require("./controllers/photos_controller.js");
var pages = require("./controllers/pages_controller.js");
var comments = require("./controllers/comments_controller.js");

app.use('/static', express.static('./static')).
    use('/images', express.static('./images')).
    use('/lib',express.static('../lib'));
    
    app.get('/',function(req,res){
        res.render('photos');
    });



app.get('/photos',photos.getPhotos);
app.get('/photo', photos.getPhoto);
app.get('/page',pages.getPage);
app.get('/comments/get',comments.getComment);
app.get('/comments/add',comments.addComment);

 
};