import express from "express";
import { syncUsers } from "../controllers/clerkcontroller.js";
import User from "../models/User.js";

const router = express.Router();

// Route to manually sync users
router.post("/sync-now", async (req, res) => {
  await syncUsers();
  res.json({ message: "Users synced successfully ✅" });
});

// Route to get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
