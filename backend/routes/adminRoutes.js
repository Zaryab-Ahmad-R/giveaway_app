import express from "express";
import User from "../models/userModel.js";
import PrizeClaim from "../models/prizeClaim.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.use(verifyAdmin);

function maskPhone(phone) {
  if (!phone || phone.length < 5) return phone;
  const visibleStart = phone.slice(0, 4);
  const visibleEnd = phone.slice(-2);
  return `${visibleStart}*****${visibleEnd}`;
}


// 🧩 Get all registered users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const maskedUsers = users.map(u => ({
      ...u._doc,
      fullPhone: u.phone,
      phone: maskPhone(u.phone),
    }));
    res.json(maskedUsers);
  } catch (err) {
    res.status(500).json({ message: "Failed to load users" });
  }
});


// 🎁 Get all prize claim entries
router.get("/claims", async (req, res) => {
  try {
    const claims = await PrizeClaim.find().sort({ createdAt: -1 });
    const maskedClaims = claims.map(c => ({
      ...c._doc,
      fullPhone: c.phone,
      phone: maskPhone(c.phone),
    }));
    res.json(maskedClaims);
  } catch (err) {
    res.status(500).json({ message: "Failed to load claims" });
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
