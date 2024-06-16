import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { sequelize } from './models/index';
import path from 'path'; // Import the 'path' module

import { setupSwagger } from './swagger'; // Swagger konfigürasyonunu içe aktarın
import routes from './routes/index'; // Route'ları içe aktarın

const app = express();
dotenv.config();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS ayarları
const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Methods'],
  credentials: true,
};
app.use(cors(corsOptions));

// Route'ları ekleyin
app.use(routes);

// Swagger'ı kurun
setupSwagger(app);

const pathToSwaggerUi = path.join(__dirname, 'swagger-ui'); // Define the 'pathToSwaggerUi' variable
app.use(express.static(pathToSwaggerUi));

const PORT: number = parseInt(process.env.PORT || '3000', 10);

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

  transporter.sendMail(mailOptions, (error: Error | null) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      return res.status(200).json({ success: 'Message sent successfully!' });
    }
  });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});

export { app, sequelize };
