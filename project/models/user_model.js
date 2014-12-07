var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{type: String, unique: true},
    name:String,
    email:String,
    color:String,
    hashed_password:String,
    profilePic: String,
    role: String,
    adminPass:String,
});

mongoose.model('User',UserSchema);