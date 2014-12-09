var crypto = require('crypto');
var mongoose = require('mongoose'),
User = mongoose.model('User');

function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).
        digest('base64').toString();
}

// sets details when users signs up
exports.signup = function(req,res){
    var user = new User({username:req.body.username});
    user.set('hashed_password', hashPW(req.body.password));
    
    user.set('role',req.body.role);
    user.set('email',req.body.email);
    user.set('name',req.body.name);
    user.set('color',req.body.color);
    user.set('adminPass',req.body.adminPass);
    user.set('profilePic',req.body.profilePic);
//saves all   
    user.save(function(err){
        if(err){
            res.session.error = err;
            res.redirect('/signup');
        } else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.color = user.color;
            req.session.email = user.email;
            req.session.role = user.role;
            req.session.adminPass = user.adminPass;
            req.session.profilePic = user.profilePic;
            req.session.name = user.name;

            req.session.msg = "Authinticated as " + user.username;
            res.redirect('/');
        }
    });
};
//checks login compared to database/authentication
exports.login = function(req,res){
    User.findOne({username: req.body.username})
    .exec(function(err,user){
        if(!user){
            err='User not found';
        } else if  (user.hashed_password ===
         hashPW(req.body.password.toString())){
             req.session.regenerate(function(){

            req.session.user = user.id;
            req.session.username = user.username;
            req.session.color = user.color;
            req.session.email = user.email;
            req.session.role = user.role;
            req.session.adminPass = user.adminPass;
            req.session.name = user.name;
            
            
            req.session.msg = "Authinticated as "+ user.username;
            res.redirect('/');
        });
    } else {
        err = 'Authintication failed';
    }
    if(err){
        req.session.regenerate(function(){
            req.session.msg = err;
            res.redirect('/login');
        });
    }
});
};

//pushes data requested from user profile
exports.getUserProfile = function(req,res){
    User.findOne({ _id: req.session.user})
    .exec(function(err,user){
        if(!user){
            res.json(404,{err:'User not found'});
        } else {
    res.json(user);
        }
    });
};
//when user changes profile it is saved here
exports.updateUser = function(req,res){
    User.findOne({ _id: req.session.user})
    .exec(function(err,user){
//Unable to update the user Name or Username at this time
        user.set('name',req.body.name);
        user.set('username',req.body.name);
        user.set('email',req.body.email);
        user.set('color',req.body.color);
        user.set('profilePic',req.body.profilePic);
        user.save(function(err){
            if(err){
                res.session.error = err;
            } else {
                req.session.msg = "User Updated";
            }
            res.redirect('/user');
        });
    });
};
// Finds user by session and destroys the user
exports.deleteUser = function(req,res){
    User.findOne({ _id: req.session.user})
    .exec(function(err,user){
        if(user){
            user.remove(function(err){
                if(err){
                    req.session.msg = err;
                }
                
                req.session.destroy(function(){
                    res.redirect('/login');
                });
            });
        } else {
            req.session.msg = "User Not Found";
            req.session.destroy(function(){
                res.redirect('/login');
            });
        }
    });
};

//sends data to bind with student list
exports.list = function(req,res){
    User.find({role :"Student"})
    .exec(function(err,users){
        if(users){
            res.json(users);
        } else {
            alert("Error");
        }
    });
};