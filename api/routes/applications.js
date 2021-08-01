const express = require('express');
const ApplicationsService = require('../app/service/applications-service');

const router = express.Router();
const applicationsService = new ApplicationsService();

/* POST application. */
router.post('/', (req, res) => {
  applicationsService.postApplication(req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.status(200).send({status: results.status});
  });
});

/* GET all applications. */
router.get('/', (_req, res) => {
  applicationsService.getListing((err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.status(200).json(results);
  });
});

/* DELETE application by id. */
router.delete('/:id', (req, res) => {
  applicationsService.deleteApplication(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.sendStatus(200);
  });
});

module.exports = router;
