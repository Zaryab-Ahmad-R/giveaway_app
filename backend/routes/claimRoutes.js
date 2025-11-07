import express from "express";
import  PrizeClaim  from "../models/prizeClaim.js"

const router = express.Router();

// POST /api/claim — create a new prize claim
router.post("/", async (req, res) => {
  try {
    const { name, phone, city, bankName, accountNumber, iban } = req.body;

    if (!name || !phone || !city || !bankName || !accountNumber) {
      return res.status(400).json({ message: "All fields except IBAN are required." });
    }

    const claim = await PrizeClaim.create({
      name,
      phone,
      city,
      bankName,
      accountNumber,
      iban,
    });

    res.status(201).json({ message: "Prize claim submitted successfully!", claim });
  } catch (error) {
    console.error("Error creating prize claim:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
