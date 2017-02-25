// required modules
var express = require('express');
var router = express.Router();

//import model
var User = require('../models/user');

// user routes

/*
** GET methods
*/
// Register route
router.get('/register', function(req, res){
    res.render('register');
});

// Login route
router.get('/login', function(req, res){
    res.render('login');
});

/*
** POST methods
*/

router.post('/register', function(req, res){
    // fectch values from the register.html form
    var name = req.body.name;
    var email = req.body.email;
    var confirmEmail = req.body.email2;
    var password = req.body.password;
    var confirmPassword = req.body.password2;

    // create a new user and save to db using model User
    var newUser = new User({
      name: name,
			email:email,
			password: password
    });
    //save newUser to User coll
    User.createUser(newUser, function(err, user){
			if(err) throw err;
			// console.log(user);
      //Flash success message if no error thrown
      req.flash('success_msg', 'You are now registered and can login');
      res.redirect('/users/login');
    });
});

module.exports = router;
