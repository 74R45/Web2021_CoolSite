const express = require('express');
const mailer = require('../mailer');

const router = express.Router();

/* Send an e-mail. */
router.post('/send', (req, res) => {
  let {email, subject, text} = req.body;
  if (/\w+@\w+/.test(email) && subject.length !== 0 && text.length !== 0) {
    mailer.send(email, subject, text).then(
      () => console.log(`E-mail confirmation sent to ${req.body.email}.`)
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
