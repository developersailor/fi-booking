import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { sequelize } from './models/index';

import routes from './routes/index';

dotenv.config();
const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(routes);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/contact', (req: Request, res: Response) => {
  const { name, email, message }: { name: string, email: string, message: string } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions: nodemailer.SendMailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error:Error) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to send email' });
      } else {
        return res.status(200).json({ success: 'Message sent successfully!' });
      }
    });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {

  });
});

export { app, sequelize };