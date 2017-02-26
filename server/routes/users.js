//import model
var User = require('../models/user');

module.exports = {

  new: function(req, res) {
    res.render('register');
  },

  create: function(req, res) {

    console.log(req.body);

    var user = new User();

    user.username        =  req.body.username;
    user.email           =  req.body.email;
    user.password        =  req.body.password;
    user.confirmPassword =  req.body.password2;

    // Form validation
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    // create a new user and save to db using model User
    var errors  = req.validationErrors();

    if (errors) {
      res.render('register',{ errors:errors });
      console.log(errors);
    } else{
      User.createUser(user, function(err, newUser){
        if(err) throw err;
        // console.log(user);
        // flash a success message if no error thrown
        console.log("user to be created", newUser);
        req.flash('success_msg', 'You are now registered. Please login');

        console.log("created user", newUser);
        // redirect user to login page
        res.redirect('/login');
      });
    }
  }
};
