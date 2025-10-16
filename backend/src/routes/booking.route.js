import express from 'express';
import { cancelBooking, createBooking, getAllBookings, getBookedSeats, getSingleBooking, getUserBookings } from '../controllers/booking.controller.js';
import { isUser } from '../middleware/authUser.middleware.js';
import { isAdmin } from '../middleware/authAdmin.middleware.js';


const router = express.Router();

// /api/v1/bookings/:id
// /api/v1/bookings/bookings
// /api/v1/bookings/admin/bookings
// /api/v1/bookings/bookings/:id/cancel
router.post('/:tripId', isUser, createBooking);
router.get('/bookings', isUser, getUserBookings);

router.get('/admin/bookings', isAdmin, getAllBookings);
router.put('/bookings/:id/cancel', isAdmin, cancelBooking);

router.get('/:tripId/seats', isUser, getBookedSeats);
router.get('/singlebooking/:id', isUser, getSingleBooking)

export default router;