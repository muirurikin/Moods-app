var passport   =  require('passport');

module.exports = {
  /**
   *
   * Any routes that deals with login/logout is basically a session, and session can either be
   * created => login, deleted/destroyed => logout or new => renders login page
   *
   */
  new: function(req, res) {
    res.render('login');
  },

  create : function(req, res, next){
    passport.authenticate('user-login', function(err, user){
      console.log(user);
      if (err) return next(err);
      if (!user) {
        console.log('user not found');
        return res.redirect('/login');
      }
      req.login(user, function(err){
        if (err) return next(err);
        /*
           either redirect the user back to the resource he/she was trying to access
           or redirect to admin page after successful login, this means if i was trying
           to access /insert and was instead redirected to /login because it is a protected
           route, then after i login, redirect me back to /insert not /admin as it was before
           */
        req.flash('success', "Successfully logged in");
        console.log(req.user);
        res.redirect(req.session.returnTo || '/');
        delete req.session.returnTo;
      });
    })(req, res, next);
  },

  destroy: function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  }
};
