const express = require('express');
const fs = require('fs');
const path = require('path');
const ApplicationsService = require('../app/service/applications-service');
const AdminService = require('../app/service/admin-service');

const router = express.Router();
const applicationsService = new ApplicationsService();
const adminService = new AdminService();

const configPath = path.join(__dirname, '..', 'config.json');

/* Validate token. */
router.post('/token/:token', (req, res) => {
  applicationsService.verifyToken(req.params.token, (err) => {
    if (err) {
      res.sendStatus(404);
    } else res.sendStatus(200);
  });
});

/* GET email config (confirmation mode) */
router.get('/email-config', (_req, res) => {
  const config = JSON.parse(fs.readFileSync(configPath));
  res.status(200).json({status: config.confirmationMode});
});

/* POST (set) email config (confirmation mode) */
router.post('/email-config', (req, res) => {
  let config = JSON.parse(fs.readFileSync(configPath));
  if (config.confirmationMode !== req.body.status) {
    config.confirmationMode = req.body.status;
    fs.writeFileSync(configPath, JSON.stringify(config));
  }
  res.sendStatus(200);
});

// Check admin login credentials
router.post('/admin', (req, res) => {
  adminService.login(req.body, (err) => {
    if (err) {
      res.status(403).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
