// required modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// define the user schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String

});
// create a User model using the define Schema
var User = mongoose.model('User', UserSchema);

// use bcrypt to hash a new user's password
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            // set the user's password equal to the hashed one
            newUser.password = hash;

            // save the password into db
            newUser.save(callback);
        });
    });
}

// export the User
module.exports = User;