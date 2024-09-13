import express from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js';
import dotenv from 'dotenv';
import Logger from './logger/winston_logger.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware


const corsOptions = {
  origin: process.env.frontend_url, // Ensure this matches exactly
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Enable sending cookies
  allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests for complex methods (like POST, PUT, DELETE)
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', scoreRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => Logger.info(`Server running on port ${PORT}`));
