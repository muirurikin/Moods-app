var mongoose =  require('mongoose');
var bcrypt   =  require('bcryptjs');
var Schema   =  mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    index: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  }

});

// create a User model using the define Schema
var User = module.exports = mongoose.model('User', UserSchema);

// use bcrypt to hash a new user's password
module.exports.createUser = function(newUser, callback){
  console.log('new user:',newUser);
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      // set the user's password equal to the hashed one
      newUser.password = hash;
      // save the password into db
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(usernname, callback){
  var query = {username: username};
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
};
