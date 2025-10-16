import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    index: true,
  },
  to: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  image: { type: String, default: "" },
  duration: { type: String },
  availableSeats: {
    type: [Number],
    required: true,
  },
  rating: {
    type: Number,
    default: 3
  },
  reviews: {
    type: Number,
    default: 0
  },
  popular: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  createdAt: { type: Date, default: Date.now },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
