var express = require("express");
var crypto = require("crypto");


module.exports = function(app){
 ///Authentication   
 var users = require("./controllers/users_controller.js");
    
    app.use('/static', express.static('./static')).
        use('/lib', express.static('../lib'));
        
    app.get('/',function(req,res){
        if(req.session.user){

//Validates adminPass to allow access to the Professor role/page
            if(req.session.adminPass == "password"){
                res.render('prof',{
                username: req.session.username, 
                msg:req.session.msg,
                color:req.session.color,
                role:req.session.role,
                profilePic:req.session.profilePic,
                name: req.session.name,
                    
            });
            }else{
//Establishes role as Student and renders the page
        if(req.session.role == "Student" ){   
            res.render('index',{
            username: req.session.username, 
            msg:req.session.msg,
            color:req.session.color,
            role:req.session.role,
            profilePic:req.session.profilePic,
            name: req.session.name,

            });
        }}
//If no valid info redirects to login
        }else{
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
        
        
    });
    
//handling for app.gets requests
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

    app.get('/showstudlist', function(req, res) {
        if(req.session.user){
         res.render('showstudlist');
        }
    });
    
   //listens for posts and gets and runs functions from users controller 
    app.post('/signup', users.signup);
    app.post('/user/update', users.updateUser);
    app.post('/user/delete',users.deleteUser);
    app.post('/login', users.login);
    app.get('/studlist', users.list);
    app.get('/user/profile',users.getUserProfile);
//////end auth


//dumb stuff that doesnt work
var photos = require("./controllers/photos_controller.js");
var pages = require("./controllers/pages_controller.js");
var comments = require("./controllers/comments_controller.js");

app.use('/static', express.static('./static')).
    use('/images', express.static('./images')).
    use('/lib',express.static('../lib'));
    
  

app.get('/photos',photos.getPhotos);
app.get('/photo', photos.getPhoto);
app.get('/page',pages.getPage);
app.get('/comments/get',comments.getComment);
app.get('/comments/add',comments.addComment);

 
};