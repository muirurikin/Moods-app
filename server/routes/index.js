var express        =  require('express');
var router         =  express.Router();
var usersRoutes    =  require('./users');
var sessionsRoutes =  require('./session');

// GET home page
router.get('/', ensureAuthenticated, function (req, res) {
  res.render('index.html');
});

router.get('/login',   sessionsRoutes.new);
router.post('/login',  sessionsRoutes.create);
router.get('/logout', sessionsRoutes.destroy);

router.get('/users/register',  usersRoutes.new);
router.post('/users/register', usersRoutes.create);

// ensure the user is authenticated
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    // req.flash('error_msg','You are not logged in');
    res.redirect('/login');
  }
}

module.exports = router;
