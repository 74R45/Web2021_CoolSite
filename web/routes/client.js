const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const router = express.Router();

const getConfig = (menuItem, lang) => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));
  config[lang].menuItems[menuItem].active = true;
  return {...config.common, ...config[lang]};
}

router.get('/', (_req, res) => {
  res.render('home', getConfig(0, 'ukr'));
});

router.get('/trainings', (_req, res) => {
  const apiReq = http.request('http://api:3001/trainings/all', apiRes => {
    apiRes.on('data', data => {
      res.render('trainings', {...getConfig(1, 'ukr'), trainings: data});
    });
  });
  apiReq.on('error', err => {
    console.log(err);
  })
  apiReq.end();
});

router.get('/about', (_req, res) => {
  res.render('about', getConfig(2, 'ukr'));
});

router.get('/en', (_req, res) => {
  res.render('home', getConfig(0, 'eng'));
});

router.get('/en/trainings', (_req, res) => {
  const apiReq = http.request('http://api:3001/trainings/all', apiRes => {
    apiRes.on('data', data => {
      res.render('trainings', {...getConfig(1, 'eng'), trainings: data});
    });
  });
  apiReq.on('error', err => {
    console.log(err);
  })
  apiReq.end();
});

router.get('/en/about', (_req, res) => {
  res.render('about', getConfig(2, 'eng'));
});

router.get('/confirm/:token', (_req, res) => {
  const title = getConfig(0, 'eng').title;
  res.render('confirm', {title});
});

module.exports = router;
