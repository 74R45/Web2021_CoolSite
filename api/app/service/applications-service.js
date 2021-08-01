const fs = require('fs');
const path = require('path');
const http = require('http');
const rand = require('crypto-random-string');
const ApplicationsDao = require("../dao/applications-dao");
const UnconfirmedDao = require("../dao/unconfirmed-dao");

class ApplicationsService {
  constructor () {
    this._applicationsDao = new ApplicationsDao();
    this._unconfirmedDao = new UnconfirmedDao();
  }

  // Post an application (from the form).
  postApplication(application, callback) {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json')))
    if (config.confirmationMode) {
      application.token = rand({length: 20, type: 'alphanumeric'});
      this._unconfirmedDao.insert(application, (err, results) => {
        if (err) {
          console.log(err);
          callback(err, results);
        }
      });

      const message = application.language === 'UKR' ?
`Доброго дня, ${application.firstName}!
Вітаємо в ${config.domain}. Якщо ви не надсилали заявку на нашому сайті, проігноруйте це повідомлення.
\nЩоб підтвердити ваш e-mail, пройдіть за посиланням: http://${config.domain}/confirm/${application.token}.
\nДякуємо, що ви з нами!` :
`Hello, ${application.firstName}!
Welcome to ${config.domain}. If you did not write an application recently, then simply ignore this message.
\nTo confirm your e-mail, please follow the link: http://${config.domain}/confirm/${application.token}.
\nThank you for using our service!`;

      const apiReq = http.request('http://mail:3002/send', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      }, apiRes => {
        apiRes.on('data', data => {
          callback(null, {status: 2});
        });
      });
      apiReq.on('error', err => callback(err));
      apiReq.end(JSON.stringify({
        email: application.email,
        subject: 'Cool Trainings',
        text: message
      }));
    } else {
      this._applicationsDao.insert(application, (err, results) => {
        callback(err, {...results, status: 1});
      });
    }
  }

  // Verify an application by token.
  verifyToken(token, callback) {
    this._unconfirmedDao.selectByToken(token, (err, results) => {
      if (err || results.length === 0) {
        callback({ error: 'Token Not Found' });
      } else {
        let application = JSON.parse(JSON.stringify(results[0]));
        
        this._applicationsDao.insert(application, (err) => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            this._unconfirmedDao.deleteByToken(token, (err) => {
              if (err) {
                console.log(err);
              }
              callback();
            });
          }
        });
      }
    });
  }

  // Get all existing applications.
  getListing(callback) {
    this._applicationsDao.selectAll(callback);
  }

  // Delete application.
  deleteApplication(id, callback) {
    this._applicationsDao.deleteById(id, callback);
  }
}

module.exports = ApplicationsService;