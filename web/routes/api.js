const express = require('express');
const http = require('http');
const session = require('express-session');
const router = express.Router();

function restrict(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.sendStatus(401);
  }
}

// Routes to forward requests to API server

router.post('/form', (req, res) => {
  const apiReq = http.request('http://api:3001/applications', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).json(JSON.parse(data));
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end(JSON.stringify(req.body));
});

router.post('/token/:token', (req, res) => {
  const apiReq = http.request(`http://api:3001/token/${req.params.token}`, {method: 'POST'}, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).send(data);
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end();
});

router.post('/admin-login', (req, res) => {
  const apiReq = http.request('http://api:3001/admin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }, apiRes => {
    apiRes.on('data', data => {
      console.log(`${req.body.login} has logged in!`);
      req.session.regenerate(() => {
        req.session.login = req.body.login;
        req.session.success = `Authenticated as ${req.body.login}.`;
        res.redirect('back');
      });
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end(JSON.stringify(req.body));
});

router.get('/email-config', (_req, res) => {
  const apiReq = http.request('http://api:3001/email-config', apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).json(JSON.parse(data));
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end();
});


router.post('/email-config', restrict, (req, res) => {
  const apiReq = http.request('http://api:3001/email-config', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).send(data);
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end(JSON.stringify(req.body));
});

router.get('/applications', restrict, (_req, res) => {
  const apiReq = http.request('http://api:3001/applications', apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).json(JSON.parse(data));
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end();
});

router.delete('/applications/:id', restrict, (req, res) => {
  const apiReq = http.request(`http://api:3001/applications/${req.params.id}`, {method: 'DELETE'}, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).send(data);
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end();
});

router.get('/trainings/all', (_req, res) => {
  const apiReq = http.request('http://api:3001/trainings/all', apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).json(JSON.parse(data));
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end();
});

router.delete('/trainings/:id', restrict, (req, res) => {
  const apiReq = http.request(`http://api:3001/trainings/${req.params.id}`, {method: 'DELETE'}, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).send(data);
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end();
});

router.post('/trainings', restrict, (req, res) => {
  const apiReq = http.request(`http://api:3001/trainings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).send(data);
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end(JSON.stringify(req.body));
});

router.put('/trainings/:id', restrict, (req, res) => {
  const apiReq = http.request(`http://api:3001/trainings/${req.params.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  }, apiRes => {
    apiRes.on('data', data => {
      res.status(apiRes.statusCode || 200).send(data);
    });
  });
  apiReq.on('error', err => {
    console.log(err);
    res.sendStatus(500);
  })
  apiReq.end(JSON.stringify(req.body));
});

module.exports = router;
