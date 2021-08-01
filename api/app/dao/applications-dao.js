const util = require('../util');
const Dao = require('./dao');

class ApplicationsDao extends Dao {
  selectAll(callback) {
    this._query(`SELECT * FROM applications`, callback);
  }

  selectById(id, callback) {
    this._query(`SELECT * FROM applications WHERE id = ${id}`, callback);
  }

  insert(ap, callback) {
    const apQ = util.queriableObj(ap);
    this._query(`
      INSERT INTO applications(firstName, lastName, email, phone, text) 
      VALUE ('${apQ.firstName}', '${apQ.lastName}', '${apQ.email}', '${apQ.phone}', '${apQ.text}')`,
      callback);
  }

  updateById(id, ap, callback) {
    const set = util.getUpdateString(ap);
    this._query(`UPDATE applications SET ${set} WHERE id = ${id}`, callback);
  }

  deleteById(id, callback) {
    this._query(`DELETE FROM applications WHERE id = ${id}`, callback);
  }
}

module.exports = ApplicationsDao;