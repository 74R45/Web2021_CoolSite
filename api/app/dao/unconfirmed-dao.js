const util = require('../util');
const Dao = require('./dao');

class UnconfirmedDao extends Dao {
  selectByToken(token, callback) {
    this._query(`SELECT * FROM unconfirmed WHERE token = '${token}'`, callback);
  }

  insert(ap, callback) {
    const apQ = util.queriableObj(ap);
    this._query(`
      INSERT INTO unconfirmed(firstName, lastName, email, phone, text, token) 
      VALUE ('${apQ.firstName}', '${apQ.lastName}', '${apQ.email}', '${apQ.phone}', '${apQ.text}', '${apQ.token}')`,
      callback);
  }

  deleteByToken(token, callback) {
    this._query(`DELETE FROM unconfirmed WHERE token = '${util.queriable(token)}'`, callback);
  }
}

module.exports = UnconfirmedDao;