import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    seats: {
        type: [Number],
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    },
    paymentInfo: {
        method: { type: String },
        paid: { type: Boolean, default: true },
        txnId: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
