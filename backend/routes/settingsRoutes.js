import express from "express";
import Settings from "../models/settings.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// ✅ Get current settings
router.get("/", async (req, res) => {
  const settings = await Settings.findOne();
  if (!settings) {
    const newSettings = await Settings.create({});
    return res.json(newSettings);
  }
  res.json(settings);
});

// ✅ Update settings (Admin only)
router.put("/", verifyAdmin, async (req, res) => {
  const { registrationEnabled, blockStart, blockEnd, timezoneOffset } = req.body;
  const settings = await Settings.findOne();
  if (!settings) {
    const newSettings = await Settings.create({
      registrationEnabled,
      blockStart,
      blockEnd,
      timezoneOffset,
    });
    return res.json(newSettings);
  }

  settings.registrationEnabled = registrationEnabled ?? settings.registrationEnabled;
  settings.blockStart = blockStart || settings.blockStart;
  settings.blockEnd = blockEnd || settings.blockEnd;
  settings.timezoneOffset = timezoneOffset ?? settings.timezoneOffset;

  await settings.save();
  res.json(settings);
});

export default router;
