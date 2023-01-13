import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const email = SENDGRID_EMAIL;

const emailSender = async data => {
  try {
    await sgMail.send({ ...data, from: email });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { emailSender };
