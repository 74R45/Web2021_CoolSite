const nodemailer = require('nodemailer');

const send = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "cooltrainings@outlook.com",
      pass: "password",
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      return error;
    }
  });

  return await transporter.sendMail({
    from: "<cooltrainings@outlook.com>",
    to: email,
    subject: subject,
    text: text,
  });
};

module.exports = { send };