import React, { useContext, useState, useEffect } from "react";
import { TourContext } from "../../context/TourBookingContext";

const TripForm = ({ onClose, tripToEdit = null }) => {
  const { createTrip, updateTrip } = useContext(TourContext);
  const [form, setForm] = useState({
    from: "",
    to: "",
    dateTime: "",
    price: "",
    seats: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (tripToEdit) {
      // Convert date and time to datetime-local format
      const dateTime = `${tripToEdit.date.split('T')[0]}T${tripToEdit.time}`;

      setForm({
        from: tripToEdit.from,
        to: tripToEdit.to,
        dateTime: dateTime,
        price: tripToEdit.price.toString(),
        seats: tripToEdit.totalSeats.toString(),
      });
    }
  }, [tripToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tripToEdit) {
      // Update existing trip
      await updateTrip(tripToEdit._id, form);
    } else {
      // Create new trip
      await createTrip(form);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[1000] px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 md:p-14 flex flex-col gap-6 shadow-[0_6px_30px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
        <h3 className="text-[20px] font-semibold text-[#1a1a1a] mb-3">
          {tripToEdit ? "Edit Trip Details" : "Trip Details"}
        </h3>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-sm font-medium text-[#333] mb-1.5">
                From
              </label>

              <input
                type="text"
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder="Departure Location"
                required
                className="w-full h-[50px] border border-[#e0e0e0] rounded-lg px-4 text-sm text-[#333] bg-[#fafafa] outline-none"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-sm font-medium text-[#333] mb-1.5">
                To
              </label>

              <input
                type="text"
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder="Arrival Destination"
                required
                className="w-full h-[50px] border border-[#e0e0e0] rounded-lg px-4 text-sm text-[#333] bg-[#fafafa] outline-none"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-sm font-medium text-[#333] mb-1.5">
                Date & Time
              </label>

              <input
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                required
                className="w-full h-[50px] border border-[#e0e0e0] rounded-lg px-4 text-sm text-[#333] bg-[#fafafa] outline-none"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-sm font-medium text-[#333] mb-1.5">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full h-[50px] border border-[#e0e0e0] rounded-lg px-4 text-sm text-[#333] bg-[#fafafa] outline-none"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="flex">
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-sm font-medium text-[#333] mb-1.5">
                Total Seat
              </label>

              <input
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                placeholder="Total no. of seats"
                required
                className="w-full h-[50px] border border-[#e0e0e0] rounded-lg px-4 text-sm text-[#333] bg-[#fafafa] outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-[180px] bg-gray-200 hover:bg-gray-300 text-gray-700 text-[15px] font-medium rounded-lg py-3 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-[180px] bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-lg py-3 transition"
            >
              {tripToEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripForm;