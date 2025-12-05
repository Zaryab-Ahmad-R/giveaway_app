import express from "express";
import User from "../models/userModel.js";
import Settings from "../models/settings.js";

const router = express.Router();

// POST /api/users — Register user
router.post("/", async (req, res) => {
  try {

    const settings = (await Settings.findOne()) || {
      registrationEnabled: true,
      blockStart: "21:30",
      blockEnd: "23:30",
      timezoneOffset: 5,
    };

    if (!settings.registrationEnabled) {
      return res.status(403).json({
        message: "⚠️ Registrations are currently disabled by the admin.",
      });
    }

    // 🕒 Apply time restriction from DB
    const nowUTC = new Date();
    const localTime = new Date(nowUTC.getTime() + settings.timezoneOffset * 60 * 60 * 1000);

    const parseTimeToMinutes = (timeString) => {
      const [h, m] = timeString.split(":").map(Number);
      return h * 60 + m;
    };

    const startBlock = parseTimeToMinutes(settings.blockStart);
    const endBlock = parseTimeToMinutes(settings.blockEnd);

    const hour = localTime.getUTCHours();
    const minute = localTime.getUTCMinutes();
    const currentTime = hour * 60 + minute;

    if (currentTime >= startBlock && currentTime <= endBlock) {
      return res.status(403).json({
        message: `⚠️ Registrations are closed between ${settings.blockStart} and ${settings.blockEnd} (Pakistan Time).`,
      });

    }



    const {
      name,
      phone,
      // facebookASK,
      // facebookPost,
      // friendsAskF,
      // sharePostF,
      // instagramASK,
      // instagramPost,
      // friendsAskI,
      // sharePostI,
      instagramHandle,
      tiktokProfile,
      facebookProfile,
      city,
    } = req.body;

    // Validate required fields manually (in case frontend bypasses it)
    if (
      !name ||
      !phone ||
      // !facebookASK ||
      // !facebookPost ||
      // !friendsAskF ||
      // !sharePostF ||
      // !instagramASK ||
      // !instagramPost ||
      // !friendsAskI ||
      // !sharePostI ||
      !tiktokProfile ||
      !instagramHandle ||
      !facebookProfile ||
      !city
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required." });
    }

    // Check for duplicate phone number
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This phone number is already registered." });
    }

    // Save user
    const user = await User.create({
      name,
      phone,
      // facebookASK,
      // facebookPost,
      // friendsAskF,
      // sharePostF,
      // instagramASK,
      // instagramPost,
      // friendsAskI,
      // sharePostI,
      tiktokProfile,
      instagramHandle,
      facebookProfile,
      city,
    });

    res.status(201).json({ message: "Registered successfully!", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// GET /api/users (optional for admin/debug)
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find().sort({ createdAt: -1 });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users." });
//   }
// });

export default router;
