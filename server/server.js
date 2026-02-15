/*import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import userRoutes from "./routes/userRoutes.js";
import { syncUsers } from "./controllers/clerkcontroller.js";
import cron from "node-cron";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Routes
app.use("/", userRoutes);

// Periodic user sync every 5 minutes
cron.schedule("1star/5 * * * *", async () => {
  console.log("Syncing users from Clerk...");
  await syncUsers();
});

app.post("/clerk",syncUsers)

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/


import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import userRoutes from "./routes/userRoutes.js";
import { ClerkWebhook } from "./controllers/weblookconroller.js";

const app = express();

await connectDB();

// Webhook FIRST
app.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  ClerkWebhook
);

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
