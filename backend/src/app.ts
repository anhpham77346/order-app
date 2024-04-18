// Import necessary modules
import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import routes from "./routes";
import { PrismaClient } from "@prisma/client";

// Create an Express app instance
const app: Express = express();
export const prisma = new PrismaClient();

// Load environment variables from .env file
dotenv.config();

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
