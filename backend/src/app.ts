// Import necessary modules
import express, { Express, Request as ExpressRequest, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import routes from "./routes";
import { PrismaClient } from "@prisma/client";
import { DataToken } from "./controller/user/postUserLogin";
import bodyParser from 'body-parser';

// Create an Express app instance
const app: Express = express();
export const prisma = new PrismaClient();
export interface Request extends ExpressRequest {
  user?: DataToken;
}

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Load environment variables from .env file
dotenv.config();

// CORS config
app.use(cors());

// Define the port number to listen on
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the routes at the '/api' base path
app.use('/api', routes);

// Define a simple route for the root path
app.get("/", (req: Request, res: Response) => {
  res.send("Hello order-app backend");
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
