const express = require('express');
const TrainingsService = require('../app/service/trainings-service');

const router = express.Router();
const trainingsService = new TrainingsService();

/* GET trainings listing. */
router.get('/all', (_req, res) => {
  trainingsService.getListing((err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.status(200).json(results);
  });
});

/* GET training by id. */
router.get('/:id', (req, res) => {
  trainingsService.getTraining(req.params.id, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.status(200).json(results[0]);
  });
});

/* POST training. */
router.post('/', (req, res) => {
  trainingsService.createTraining(req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.sendStatus(200);
  });
});

/* PUT update training by id. */
router.put('/:id', (req, res) => {
  trainingsService.updateTraining(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.sendStatus(200);
  });
});

/* DELETE training by id. */
router.delete('/:id', (req, res) => {
  trainingsService.deleteTraining(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({error: err});
    } else res.sendStatus(200);
  });
});

module.exports = router;
