function ensureAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

function setUserLocals(req, res, next) {
  res.locals.currentUser = req.session?.user || null;
  next();
}

module.exports = { ensureAuth, setUserLocals };