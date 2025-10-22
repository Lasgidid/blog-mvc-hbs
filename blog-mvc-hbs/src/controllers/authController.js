const User = require('../models/User');

exports.loginForm = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.render('auth/login', { error: 'Invalid credentials' });
    // const ok = await user.comparePassword(password);
    // if (!ok) return res.render('auth/login', { error: 'Invalid credentials' });
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (e) { next(e); }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};