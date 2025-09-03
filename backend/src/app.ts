import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import itemRouter from "./router/itemRouter.js";
import connectDB from "./databases/connection.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", itemRouter);

// Connect to DB
connectDB();

export default app;
