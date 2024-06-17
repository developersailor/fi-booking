import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import winston from 'winston'; 
import path from 'path'; 

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


const PORT: number = parseInt(process.env.PORT || '3000', 10);


app.listen(PORT, () => {

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    // prisma client logları için
    new winston.transports.File({ filename: 'prisma.log', level: 'info' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
  if(process.env.NODE_ENV === 'development'){
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is running on http://localhost:${PORT}/api-docs`);
  }
  else if (process.env.NODE_ENV === 'production'){
    console.log("production mode")
  }
  else{
    console.log("unknown mode")
  }
});

export default app;