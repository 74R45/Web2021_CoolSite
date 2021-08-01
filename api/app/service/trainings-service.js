const TrainingsDao = require("../dao/trainings-dao");

class TrainingsService {
  constructor () {
    this._trainingsDao = new TrainingsDao();
  }

  // Get all available trainings (with short descriptions).
  getListing(callback) {
    this._trainingsDao.selectAll(callback);
  }

  // Get info about one training (with full description).
  getTraining(id, callback) {
    this._trainingsDao.selectById(id, callback);
  }

  // Update training.
  updateTraining(id, body, callback) {
    this._trainingsDao.updateById(id, body, callback);
  }

  // Create new training.
  createTraining(body, callback) {
    this._trainingsDao.insert(body, callback);
  }

  // Delete training.
  deleteTraining(id, callback) {
    this._trainingsDao.deleteById(id, callback);
  }
}

module.exports = TrainingsService;