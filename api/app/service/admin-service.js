const hasher = require('pbkdf2-password')({digest: 'sha256', keyLength: 64});
const AdminDao = require("../dao/admin-dao");

class AdminService {
  constructor () {
    this._adminDao = new AdminDao();
  }

  // Verify that credentials match the ones in the DB
  login(user, callback) {
    this._adminDao.selectByLogin(user.login, (err, results) => {
      if (err || results.length === 0) {
        console.log(err);
        if (results.length === 0) err = {message: 'Invalid login'};
        callback(err);
      } else {
        const dbUser = results[0];
        hasher({ password: user.password, salt: 'WbvJ5woO3' }, (_err, _pass, _salt, hash) => {
          if (_err) console.log(_err);
          if (hash !== dbUser.password) {
            err = {message: 'Invalid password'}
            console.log(`${user.login} didn't log in!`);
          };
          callback(err);
        });
      }
    });
  }
}

module.exports = AdminService;