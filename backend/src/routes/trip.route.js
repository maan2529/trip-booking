import express from 'express';
import { createTrip, deleteTripById, editTripById, getTripById, getTrips, getAdminTrips } from '../controllers/trip.controller.js';
import { isAdmin } from '../middleware/authAdmin.middleware.js';

const router = express.Router();


// /api/v1/trips/create
// /api/v1/trips/
// /api/v1/trips/get/:id
// /api/v1/trips/edit/:id
// /api/v1/trips/delete/:id
router.post('/create', isAdmin, createTrip);
router.get('/', getTrips);
router.get('/get/:id', getTripById);
router.put('/edit/:id', isAdmin, editTripById);
router.delete('/delete/:id', isAdmin, deleteTripById);

router.get("/admin", isAdmin, getAdminTrips)

export default router;