import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { ClerkWebhook } from "./controllers/webhook.js";

const app = express();

app.use(cors());

// Connect to DB
await connectDB();

// Clerk webhook route
// Must come BEFORE any global parser
app.post(
  "/clerk",
  express.raw({ type: "application/json", limit: "5mb" }),
  ClerkWebhook
);

// Other routes can still use JSON
app.use(express.json());

// Example other route
app.get("/", (req, res) => res.send("API Working"));

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
