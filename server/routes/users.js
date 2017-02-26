//import model
var User = require('../models/user');

module.exports = {
  /**
   *
   * Going by the restful routing approach users routes should correspond to the following
   * functions, new  =>  this should render the registration template, create => this route
   * creates a new user saves him/her to the database and redirect to specified route,
   * edit => Edit function renders the users edit template,
   * put => PUT should uptate a user and redirect to specified route
   * delete => deletes the user and redirect
   */

  new: function(req, res) {
    res.render('register');
  },

  create: function(req, res) {
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
      // should probably check if user with similar emails already exists before
      // we create the user
      User.createUser(user, function(err, newUser){
        if(err) throw err;
        // flash a success message if no error thrown
        req.flash('success_msg', 'You are now registered. Please login');

        console.log("created user", newUser);
        // redirect user to login page
        res.redirect('/login');
      });
    }
  }
};
