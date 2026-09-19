const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { error: null, form: {} });
});

router.post('/register', (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name || !email || !password) {
    return res.render('register', { error: 'All fields are required.', form: req.body });
  }
  if (password.length < 6) {
    return res.render('register', { error: 'Password must be at least 6 characters.', form: req.body });
  }
  if (password !== confirm_password) {
    return res.render('register', { error: 'Passwords do not match.', form: req.body });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase().trim());
  if (existing) {
    return res.render('register', { error: 'An account with that email already exists.', form: req.body });
  }

  const password_hash = bcrypt.hashSync(password, 10);
  const info = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
    .run(name.trim(), email.toLowerCase().trim(), password_hash);

  req.session.user = { id: info.lastInsertRowid, name: name.trim(), email: email.toLowerCase().trim() };
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login', { error: null, form: {} });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get((email || '').toLowerCase().trim());

  if (!user || !bcrypt.compareSync(password || '', user.password_hash)) {
    return res.render('login', { error: 'Invalid email or password.', form: req.body });
  }

  req.session.user = { id: user.id, name: user.name, email: user.email };
  const dest = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(dest);
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
