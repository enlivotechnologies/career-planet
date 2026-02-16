
import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, ''); // Remove spaces from App Password

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const mailOptions = {
  from: emailUser,
};
