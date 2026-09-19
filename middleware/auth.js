function attachUser(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}

function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/login');
  }
  next();
}

module.exports = { attachUser, requireLogin };
