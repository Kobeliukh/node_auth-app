import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const send = (email, subject, html) => {
  return transporter.sendMail({
    from: 'node_auth-app',
    to: email,
    subject: subject,
    html: html,
  });
};

export const mailer = { send };
