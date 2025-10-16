import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { TourContext } from "../context/TourBookingContext";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const trip = location.state?.trip;

  
  const { createBooking } = useContext(TourContext);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!trip) {
    return <p className="text-center mt-10">No trip details found.</p>;
  }

  const totalSeats = trip.totalSeats || 40;
  const availableSeats = trip.availableSeats || [];

  const allSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  const bookedSeats = allSeats.filter(seat => !availableSeats.includes(seat));

  console.log("Total Seats:", totalSeats);
  console.log("Available Seats:", availableSeats);
  console.log("Booked Seats:", bookedSeats);

  const seatsPerRow = 6;
  const numRows = Math.ceil(totalSeats / seatsPerRow);

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleConfirm = async () => {
    if (selectedSeats.length === 0) {
      // alert("Please select at least one seat before continuing.");
        toast.error("Please select at least one seat before continuing.");
      return;
    }

    try {
      setLoading(true);
      const response = await createBooking(trip._id, selectedSeats);
      console.log("Booking Response:", response);

      if (response.success) {
        // alert("Booking created successfully!");
        navigate("/checkout", { state: { trip, selectedSeats },
           replace: true
         });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      // alert("Booking failed. Please try again.");
        toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const tripImage =
    trip.image && trip.image.trim() !== ""
      ? trip.image
      : `https://picsum.photos/1072/508?random=${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      <div className="w-full max-w-5xl mx-auto">
        <img
          src={tripImage}
          alt={`${trip.from} to ${trip.to}`}
          className="w-full max-h-[420px] sm:max-h-[480px] rounded-lg object-cover shadow"
        />
      </div>

      <div className="w-full max-w-5xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
            <div className="space-y-3">
              <h3 className="text-gray-800 font-semibold text-lg">Trip Details</h3>
              <div className="text-gray-600 text-sm">
                <span className="block font-medium">From</span>
                <span>{capitalize(trip.from)}</span>
              </div>
              <div className="text-gray-600 text-sm">
                <span className="block font-medium">Date</span>
                <span>{formatDate(trip.date)}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-3 text-left sm:text-right">
              <div>
                <span className="block font-medium">To</span>
                <span>{capitalize(trip.to)}</span>
              </div>
              <div>
                <span className="block font-medium">Time</span>
                <span>{trip.time}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm block">Fare per seat</span>
            <span className="text-blue-600 font-bold text-2xl">
              ${trip.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow p-5 sm:p-6 border border-gray-200">
          <h3 className="text-gray-800 font-semibold mb-4 text-lg sm:text-xl">
            Select Your Seat
          </h3>

          <div className="mx-auto p-4 sm:p-6 rounded-lg bg-gray-100">
            <h4 className="text-gray-800 font-semibold text-center mb-4 text-base sm:text-lg">
              Deluxe Cabin
            </h4>

            <div className="flex justify-center overflow-x-auto">
              <div className="inline-block">
                {Array.from({ length: numRows }).map((_, rowIndex) => {
                  const rowLetter = String.fromCharCode(65 + rowIndex); // A, B, C, etc.

                  return (
                    <div key={rowIndex} className="flex justify-center mb-2 last:mb-0">
                      {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
                        const seatNumber = rowIndex * seatsPerRow + colIndex + 1;
                        const seatLabel = `${rowLetter}${colIndex + 1}`; // A1, A2, B1, etc.

                        if (seatNumber > totalSeats) {
                          return (
                            <div
                              key={colIndex}
                              className="w-10 h-10 mx-1 sm:mx-1.5"
                            />
                          );
                        }

                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);

                        return (
                          <button
                            key={seatNumber}
                            onClick={() => toggleSeat(seatNumber)}
                            disabled={isBooked}
                            className={`w-10 h-10 rounded-md border text-xs font-medium flex items-center justify-center transition-all mx-1 sm:mx-1.5
                  ${isBooked
                                ? "bg-red-200 text-red-600 cursor-not-allowed"
                                : isSelected
                                  ? "bg-blue-600 text-white shadow-md"
                                  : "bg-white hover:bg-gray-100 text-gray-700"
                              }`}
                          >
                            {seatLabel}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-white border border-gray-300" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-red-200 border border-red-300" />
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-blue-600" />
              <span className="text-gray-700">Selected</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-700">{totalSeats}</div>
                <div className="text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{availableSeats.length}</div>
                <div className="text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">{bookedSeats.length}</div>
                <div className="text-gray-500">Booked</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{selectedSeats.length}</div>
                <div className="text-gray-500">Selected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow p-5 sm:p-6">
          <h4 className="font-medium text-gray-800 mb-1 text-base sm:text-lg">Selected Seats</h4>
          <p className="text-gray-600 text-sm">
            {selectedSeats.length > 0
              ? selectedSeats.sort((a, b) => a - b).join(", ")
              : "No seats selected"}
          </p>
          {selectedSeats.length > 0 && (
            <p className="text-gray-800 font-semibold mt-2 text-sm sm:text-base">
              Total: ${(selectedSeats.length * trip.price).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-6 mb-10 text-center">
        <button
          onClick={handleConfirm}
          disabled={loading || selectedSeats.length === 0}
          className={`w-full sm:w-60 py-3 rounded-lg font-medium transition ${loading || selectedSeats.length === 0
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;