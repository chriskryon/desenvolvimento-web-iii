import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import itemRouter from "./router/itemRouter.js";
import connectDB from "./databases/connection.js";

const app = express();

// Middleware
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://localhost:5174",
			"http://localhost:3000",
		],
		credentials: true,
	}),
);
app.use(bodyParser.json());

// Routes
app.use("/api", itemRouter);

// Connect to DB
connectDB();

export default app;
