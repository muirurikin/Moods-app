// required modules
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//import model
var User = require('../models/user');

// user routes

/*
** GET methods
*/
// Register route
router.get('/register', function(req, res){
    res.render('register');
})

// Login route
router.get('/login', function(req, res){
    res.render('login');
});

/*
** POST methods
*/

router.post('/register', function(req, res){
    // console.log(req.body);
    // fectch values from the register.html form
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.password2;

    // Form validation
    req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    // create a new user and save to db using model User
     var errors  = req.validationErrors();
     
     if(errors){
         res.render('register',{
			errors:errors
		});
     } else{
        // create newUser object
    var newUser = new User({
        name: "name",
        email: email,
        password: password
    });
console.log(newUser.name);
    // save the newUser to User collection
    User.createUser(newUser, function(err, user){
        if(err) throw err;
        // console.log(user);
    });
    // flash a success message if no error thrown
        console.log("user to be created", newUser); 
        req.flash('success_msg', 'You are now registered. Please login');

        console.log("created user", user);
        // redirect user to login page
        res.redirect('/users/login')
     }
    
});

// authenticate login using passport
  passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

// modules for export
module.exports = router;

