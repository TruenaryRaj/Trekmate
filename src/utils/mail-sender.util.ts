import { EmailInfo } from '../types';
import nodemailer from 'nodemailer';
import { mailTemplates } from './template.utils';


const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, 
  },
});


export const sendEmail = async (
  input: EmailInfo
 ) => {
  if (!input) {
    throw new Error('Missing required fields to send email.');
  }
  const template = mailTemplates.getTemplate(input);
try {
  await transporter.sendMail({
    from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
    to: input.receiver,
    subject: input.subject,
    html: template,
  });
} catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.error("Mail Sending error", error);
    throw new Error("Failed to send mail");
    }
};