const util = require('../util');
const Dao = require('./dao');

class TrainingsDao extends Dao {
  selectAll(callback) {
    this._query(`SELECT * FROM trainings`, callback);
  }

  selectById(id, callback) {
    this._query(`SELECT * FROM trainings WHERE id = ${id}`, callback);
  }

  insert(tr, callback) {
    const trQ = util.queriableObj(tr);
    this._query(`
      INSERT INTO trainings(title, descShort, descFull, language) 
      VALUE ('${trQ.title}', '${trQ.descShort}', '${trQ.descFull}', '${trQ.language}')`,
      callback);
  }

  updateById(id, tr, callback) {
    const set = util.getUpdateString(tr);
    this._query(`UPDATE trainings SET ${set} WHERE id = ${id}`, callback);
  }

  deleteById(id, callback) {
    this._query(`DELETE FROM trainings WHERE id = ${id}`, callback);
  }
}

module.exports = TrainingsDao;