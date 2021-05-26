import SQLInstance from "./SQLInstance.js";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';

import { getDetectorRouter, putDetectorRouter } from './routes/detector/index.js';
import { getHouseRouter } from './routes/house/index.js';
import { getRoomRouter } from './routes/room/index.js';

// Enable .env config variables
dotenv.config();
// Setup our sql instance
export const sqlInstance = new SQLInstance(process.env.API_HOST, process.env.API_PORT, process.env.API_USER, process.env.API_PASSWORD, process.env.API_DATABASE);
sqlInstance.connect();

// Define our swagger doc
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Documentation',
      description: 'This is our connected house app api doc',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// Create our express App
export const app = express();
// Allow user to send data in JSON Format
app.use(express.json());
// Allow user to send data in JSON Format
app.use(cors());
// Allow user to send data in JSON Format
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// House routes
app.use('/', getHouseRouter);

// Room routes
app.use('/', getRoomRouter);

// Detector routes
app.use('/', getDetectorRouter);
app.use('/', putDetectorRouter);

// Make our app listen to port 3000
app.listen(3000);

