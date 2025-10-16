import React, { useEffect, useState } from "react";
import { FaBus, FaUsers, FaClock } from "react-icons/fa";
import TripForm from "../../components/admin/TripForm";
import { toast } from "react-toastify"; 
import { MdEdit } from "react-icons/md"; 
import { MdDelete } from "react-icons/md";
import axiosInstance from "../../axios/axios";

const AdminDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    try {
      const { data } = await axiosInstance.get("/trips/admin");

      if (data.success && data.trips) {
        setTrips(data.trips);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      toast.error("Failed to fetch trips");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [tripsResponse, bookingsResponse] = await Promise.all([
          axiosInstance.get("/trips/admin"),
          axiosInstance.get("/bookings/admin/bookings"),
        ]);

        const tripsResult = tripsResponse.data;
        const bookingsResult = bookingsResponse.data;

        if (tripsResult.success && tripsResult.trips) {
          setTrips(tripsResult.trips);
        } else {
          console.warn("Failed to fetch trips:", tripsResult.message || tripsResult.messgae);
        }

        if (bookingsResult.success && bookingsResult.data) {
          setBookings(bookingsResult.data);
        } else {
          console.warn("Failed to fetch bookings:", bookingsResult.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleDeleteTrip = async (tripId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const { data } = await axiosInstance.delete(
        `/trips/delete/${tripId}`
      );

      if (data.success) {
        toast.success("Trip deleted successfully!");
        await fetchTrips();
      } else {
        toast.error(data.message || "Failed to delete trip");
      }
    } catch (err) {
      console.error("Error deleting trip:", err);
      toast.error("Failed to delete trip. Please try again.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTrip(null);
    // Refresh trips after form closes
    fetchTrips();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} ${timeString}`;
  };

const upcomingDepartures = bookings.filter((booking) => {
  if (!booking.trip || !booking.trip.date) return false; // safety check

  const tripDate = new Date(booking.trip.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return tripDate >= today && booking.status === "booked";
}).length;

  return (
    <div className="relative top-5 mx-auto max-w-[1280px] min-h-[1042px] bg-white text-gray-900 px-10 py-5">
      <h2 className="text-[28px] font-semibold mb-8">Admin Dashboard</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between gap-6 mb-12 max-[1366px]:flex-col">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-[112px] flex-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-[22px] mr-4 bg-blue-50 text-blue-600">
            <FaBus />
          </div>
          <div>
            <h3 className="text-[28px] font-bold m-0">
              {loading ? "..." : trips.length}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Total Trips</p>
          </div>
        </div>

        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-[112px] flex-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-[22px] mr-4 bg-green-50 text-green-600">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-[28px] font-bold m-0">
              {loading ? "..." : bookings.length}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Total Bookings</p>
          </div>
        </div>

        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-[112px] flex-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-[22px] mr-4 bg-yellow-50 text-yellow-600">
            <FaClock />
          </div>
          <div>
            <h3 className="text-[28px] font-bold m-0">
              {loading ? "..." : upcomingDepartures}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Upcoming Departures</p>
          </div>
        </div>
      </div>

      {/* Trip Management */}
      <section className="w-full max-w-[1232px] h-[336px] bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-10 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold">Trip Management</h4>
          <button
            className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              setEditingTrip(null);
              setShowForm(true);
            }}
          >
            + Add Trip
          </button>
        </div>

        <div className="overflow-auto max-h-[260px]">
          <table className="w-full border-collapse bg-white rounded-md border border-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Departure
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Arrival
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Seats
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    Loading trips...
                  </td>
                </tr>
              ) : trips.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No trips available. Click "Add Trip" to create one.
                  </td>
                </tr>
              ) : (
                trips.map((t) => (
                  <tr
                    key={t._id}
                    className="h-[73px] border-b border-gray-200 text-gray-900 text-sm"
                  >
                    <td className="px-4 truncate" title={t._id}>
                      {t._id.slice(-8)}
                    </td>
                    <td className="px-4 truncate">
                      {t.from.charAt(0).toUpperCase() + t.from.slice(1)} →{" "}
                      {t.to.charAt(0).toUpperCase() + t.to.slice(1)}
                    </td>
                    <td className="px-4 truncate">
                      {formatDateTime(t.date, t.time)}
                    </td>
                    <td className="px-4 truncate">-</td>
                    <td className="px-4 truncate">${t.price.toFixed(2)}</td>
                    <td className="px-4 truncate">{t.totalSeats}</td>
                    <td className="px-4">
                      <button
                        className="mr-2 text-blue-600 hover:text-blue-800"
                        title="Edit Trip"
                        onClick={() => handleEditTrip(t)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete Trip"
                        onClick={() => handleDeleteTrip(t._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

         
         {/* Booking Management */}
      <section className="w-full max-w-[1232px] h-[336px] bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-10 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-base font-semibold">Booking Management</h4>
          <span className="text-sm text-gray-500">
            Total: {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-auto max-h-[260px]">
          <table className="w-full border-collapse bg-white rounded-md border border-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Booking ID
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Passenger
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Seat Numbers
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Booking Date
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No bookings available.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="h-[73px] border-b border-gray-200 text-gray-900 text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 truncate" title={booking._id}>
                      {booking._id.slice(-8)}
                    </td>
                    <td className="px-4 truncate">
                      {booking.user?.name || "Guest"}
                    </td>
                    <td className="px-4 truncate">
                      {booking.user?.email || "N/A"}
                    </td>
                    <td className="px-4">
                      <div className="flex flex-wrap gap-1">
                        {booking.seats && booking.seats.length > 0 ? (
                          booking.seats.map((seat, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                            >
                              {seat}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">No seats</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 truncate">
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-600 capitalize">
                          {booking.paymentInfo?.method || "N/A"}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            booking.paymentInfo?.paid
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}
                        >
                          {booking.paymentInfo?.paid ?  "Pending" : "Paid" }
                        </span>
                      </div>
                    </td>
                    <td className="px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "booked"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <TripForm
          onClose={handleCloseForm}
          tripToEdit={editingTrip}
        />
      )}
    </div>
  );
};

export default AdminDashboard;