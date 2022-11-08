import SQLInstance from "./SQLInstance.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';

import {
  getDetectorRouter,
  postDetectorRouter,
  putDetectorRouter,
} from "./routes/detector/index.js";
import { getHouseRouter } from "./routes/house/index.js";
import { getRoomRouter, getRoomConsumptionRouter } from "./routes/room/index.js";

// Enable .env config variables
dotenv.config();
// Setup our sql instance
export const sqlInstance = new SQLInstance(
  process.env.API_HOST,
  process.env.API_PORT,
  process.env.API_USER,
  process.env.API_PASSWORD,
  process.env.API_DATABASE
);
sqlInstance.connect();

// Define our swagger doc
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Api Documentation",
      description: "This is our connected house app api doc",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

// Create our express App
export const app = express();
// Allow user to send data in JSON Format
app.use(express.json());
// Allow user to send data in JSON Format
app.use(cors());
// Allow user to send data in JSON Format
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// House routes
app.use("/", getHouseRouter);

// Room routes
app.use("/", getRoomRouter);
app.use("/", getRoomConsumptionRouter);

// Detector routes
app.use("/", getDetectorRouter);
app.use("/", postDetectorRouter);
app.use("/", putDetectorRouter);

// Make our app listen to port 3000
const httpServer = http.createServer(app);
httpServer.listen(3000);

// socket.io
export const ioServer = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

ioServer.on('connection', (socket) => {
  console.log('User connected to socket');
  socket.on('disconnect', () => {
    console.log('User disconnected from socket');
  });
});
