import express from "express";
import User from "../models/userModel.js";
import PrizeClaim from "../models/prizeClaim.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.use(verifyAdmin);

// 🧩 Get all registered users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// 🎁 Get all prize claim entries
router.get("/claims", async (req, res) => {
  try {
    const claims = await PrizeClaim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch claims" });
  }
});

// 🏆 Pick a random winner from users
router.get("/users/random", async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomUser = await User.findOne().skip(randomIndex);
    res.json(randomUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to select random winner" });
  }
});

export default router;
