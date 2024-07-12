import express from "express";
import cartRoutes from "./routes/cart.routes";
import productRoutes from "./routes/product.routes";
import authMiddleware from "./middlewares/auth.middleware";
import * as authController from "./controllers/auth.controller";
import mongoose from "mongoose";
import dotenv from "dotenv";
import winston from "winston";
import expressWinston from "express-winston";


import { Request, Response, NextFunction } from 'express';


dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("Connected to MongoDB instance");
  } catch (error) {
    console.error("Something went wrong connecting to MongoDB:", error);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'ddd, DD MMM YYYY HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()} ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ],
});

declare global {
    namespace Express {
      interface Request {
        _startTime?: number;
      }
    }
  }
app.use((req: Request, res: Response, next: NextFunction) => {
  req._startTime = Date.now();
  next();
});

app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: (req: Request, res: Response) => {
    const responseTime = Date.now() - (req._startTime || Date.now());
    return `${req.method} ${req.url} - ${responseTime}ms`;
  },
  meta: false,
}));

// Health is paramount
app.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const isDbConnected = dbState === 1;

  if (isDbConnected) {
    res.status(200).json({ message: 'Application is healthy' });
  } else {
    res.status(500).json({ message: 'Application is unhealthy' });
  }
});

// No auth required here
app.use("/api/auth/register", authController.register);
app.use("/api/auth/login", authController.login);

// Auth required
app.use("/api", authMiddleware.authenticate);
app.use("/api/profile/cart", cartRoutes);
app.use("/api/products", productRoutes);

connectToDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
    logger.info(`Server running on port: ${PORT}`);
  });

  const gracefulShutdown = () => {
    console.log("SIGTERM received, closing server");
    logger.info("SIGTERM received, closing server");
    server.close(() => {
      console.log("Server closed");
      logger.info("Server closed");
      mongoose.connection.close(false).then(() => {
        console.log("MongoDB connection closed");
        logger.info("MongoDB connection closed");
        process.exit(0);
      });
    });
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
});
