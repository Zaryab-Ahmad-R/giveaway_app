import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import settingsRoutes from "./routes/settingsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(hpp());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

// Rate limit
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/claim", claimRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
