import express from 'express';
import authRoutes from './routes/auth.route.js';
import tripRoutes from './routes/trip.route.js';
import bookingRoutes from './routes/booking.route.js';
import globalErrorHandler from './utils/errorHandler.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);
  app.use(express.static(path.join(__dirname, "../public")));

const environment_variables = process.env.FRONTEND_URL ? process.env.FRONTEND_URL : "http://localhost:5175";

app.use(cors({
  origin: environment_variables,
  credentials: true,
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/bookings', bookingRoutes);



  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })
app.use(globalErrorHandler);

export default app;