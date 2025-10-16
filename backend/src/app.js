import express from 'express';
import authRoutes from './routes/auth.route.js';
import tripRoutes from './routes/trip.route.js';
import bookingRoutes from './routes/booking.route.js';
import globalErrorHandler from './utils/errorHandler.js';
import cors from "cors";
import cookieParser from 'cookie-parser';


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


app.use(globalErrorHandler);

export default app;