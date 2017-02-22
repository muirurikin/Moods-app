// define the user schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String

});
// create a User model using the define Schema
var User = mongoose.model('User', UserSchema);

// export the User
module.exports = User;