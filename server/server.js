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
import { ClerkWebhook } from "./controllers/clerkcontroller.js";


const app = express();

// ===============================
// Connect Database
// ===============================
await connectDB();

// ===============================
// Webhook Route (MUST BE FIRST)
// ===============================
// IMPORTANT: Use express.raw() here
app.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  ClerkWebhook
);

// ===============================
// Normal Middlewares (After Webhook)
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Other Routes
// ===============================
app.use("/", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

