const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const router = express.Router();

const getConfig = (menuItem, lang) => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));
  config[lang].menuItems[menuItem].active = true;
  return {...config.common, ...config[lang]};
}

function restrict(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/admin/login');
  }
}

router.get('/', restrict, (_req, res) => {
  res.render('adminPanel', getConfig(0, 'eng'));
});

router.get('/login', (_req, res) => {
  res.render('adminLogin', getConfig(0, 'eng'));
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
