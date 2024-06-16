import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import path from 'path'; // Import the 'path' module

import { setupSwagger } from './swagger'; // Swagger konfigürasyonunu içe aktarın
import routes from './routes/index'; // Route'ları içe aktarın
import exp from 'constants';

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;