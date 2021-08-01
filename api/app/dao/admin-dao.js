const util = require('../util');
const Dao = require('./dao');

class AdminDao extends Dao {
  selectByLogin(login, callback) {
    this._query(`SELECT * FROM admin WHERE login = '${util.queriable(login)}'`, callback);
  }
}

module.exports = AdminDao;