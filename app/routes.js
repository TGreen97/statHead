// app/routes.js

module.exports = function(app, passport) {
  // Route for Home page
  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/users/:id', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      Users : req.users.id
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // Get basic info from Google Profile
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
      passport.authenticate('google', {
          successRedirect : '/users/:id',
          failureRedirect : '/'
      }));
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}