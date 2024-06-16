// src/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fi Booking API',
      version: '1.0.0',
      description: 'API documentation for the Fi Booking application',
      contact: {
        name: 'Mehmet Fiskindal',
        email: 'mehmet@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Booking: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the booking'
            },
            userId: {
              type: 'string',
              description: 'Unique identifier for the user who made the booking'
            },
            roomId: {
              type: 'string',
              description: 'Unique identifier for the room being booked'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Start date of the booking'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'End date of the booking'
            },
            status: {
              type: 'string',
              description: 'Status of the booking',
              enum: ['confirmed', 'pending', 'cancelled']
            }
          },
          required: ['id', 'userId', 'roomId', 'startDate', 'endDate', 'status']
        },
        User: {
          type: 'object',
          properties: {

            username: {
              type: 'string',
              description: 'Username of the user'
            },
         
            password: {
              type: 'string',
              format: 'password',
              description: 'Password of the user'
            }
            // Add more properties as needed
          },
          required: ['id', 'username', 'email', 'password']
        },
      },
      
    },
    
  },
  apis: ['./routes/*.ts', './models/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
