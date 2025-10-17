import express from 'express';
import authRoutes from './routes/auth.route.js';
import tripRoutes from './routes/trip.route.js';
import bookingRoutes from './routes/booking.route.js';
import globalErrorHandler from './utils/errorHandler.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true, 
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const clientPath = path.join(__dirname, '../client/dist');

// app.use(express.static(clientPath));
// app.get('*', (_, res) => res.sendFile(path.join(clientPath, 'index.html')));

app.use(globalErrorHandler);

export default app;