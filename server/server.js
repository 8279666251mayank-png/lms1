import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { ClerkWebhook } from "./controllers/webhook.js";

// Init
const app = express();

// Middleware
app.use(cors());

// Connect to database
await connectDB();

// Routes
app.get("/", (req, res) => res.send("API Working"));

// Clerk webhook MUST use raw body and come BEFORE any JSON middleware
app.post("/clerk", express.raw({ type: "application/json" }), ClerkWebhook);

// For all other routes, use JSON middleware
app.use(express.json());

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
