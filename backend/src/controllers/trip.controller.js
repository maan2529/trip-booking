import Trip from "../models/trip.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTrip = asyncHandler(async (req, res) => {
  const { from, to, date, time, price, totalSeats } = req.body;

  if (!from || !to || !date || !time || !price || !totalSeats) {
    throw new ApiError(400, 'All fields are required');
  }

  const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const trip = await Trip.create({
    from,
    to,
    date,
    time,
    price,
    totalSeats,
    availableSeats,
  });
  return res.status(201).json(
    new ApiResponse(201, trip, "Trip created successfully")
  );
});

const getTrips = asyncHandler(async (req, res) => {
  const { from, to, date } = req.query;
  const filter = {};
  if (from) filter.from = from;
  if (to) filter.to = to;
  if (date) filter.date = date;

  const trips = await Trip.find(filter);
  return res.status(200).json(
    new ApiResponse(200, trips, "Trips retrieved successfully")
  );
});

const getTripById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ApiError(400, "Invalid Trip ID format");
  }

  const trip = await Trip.findById(id);
  if (!trip) {
    throw new ApiError(404, "Trip not found");
  }
  return res.status(200).json(new ApiResponse(200, trip, "Trip details retrieved successfully"));
});

const editTripById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { from, to, date, time, price, totalSeats } = req.body;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ApiError(400, "Invalid Trip ID format");
  }

  if (!from || !to || !date || !time || !price || !totalSeats) {
    throw new ApiError(400, 'All fields are required');
  }

  const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const updatedTrip = await Trip.findByIdAndUpdate(
    id,
    { from, to, date, time, price, totalSeats, availableSeats },
    { new: true, runValidators: true }
  );

  if (!updatedTrip) {
    throw new ApiError(404, "Trip not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedTrip, "Trip updated successfully")
  );
});

const deleteTripById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ApiError(400, "Invalid Trip ID format");
  }

  const trip = await Trip.findByIdAndDelete(id);
  if (!trip) {
    throw new ApiError(404, "Trip not found");
  }
  return res.status(200).json(new ApiResponse(200, null, "Trip deleted successfully"));
});

const getAdminTrips = async(req, res) =>{
  const { id } = req.user;

  const trips = await Trip.find();

  res.status(200).json({
    messgae:"trip fetched!",
    success:true,
    trips
  })
}

export { createTrip, getTrips, getTripById, editTripById, deleteTripById, getAdminTrips };