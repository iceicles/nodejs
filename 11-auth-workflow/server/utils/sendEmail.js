const nodemailer = require('nodemailer');

const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'forrest.blanda62@ethereal.email',
      pass: 'xwCgNuR6tpXzxfA6EQ',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Iceicles" <iceicles@gmail.com>', // sender address
    to: 'user@user.com', // list of receivers
    subject: 'Testing email ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Testing email?</b>', // html body
  });
};

module.exports = sendEmail;
