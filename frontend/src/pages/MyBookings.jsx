import React, { useEffect, useState } from "react";
import { Train, Calendar, Clock, MapPin } from "lucide-react";
import axiosInstance from "../axios/axios";
import "../style/MyBookings.css";
import { formatSeats } from "../utils/formatSeats";

const MyBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserBooking = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(
        "/bookings/bookings"
      );

      console.log("API Response:", response?.data);

      if (response?.data?.success && response?.data?.data) {
        setUpcomingBookings(response.data.data.upcomingBookings || []);
        setPastBookings(response.data.data.pastBookings || []);
        console.log(response?.data?.data?.upcomingBookings)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBooking();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const capitalize = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <div className="mybookings-page">
        <p className="mybookings-message">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mybookings-page">
        <div className="mybookings-error">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mybookings-page">
      <section className="mybookings-section">
        <h2 className="mybookings-heading">
          Upcoming Bookings
        </h2>

        {upcomingBookings.length === 0 ? (
          <p className="mybookings-empty">No upcoming bookings found.</p>
        ) : (
          <div className="booking-cards">
            {upcomingBookings.map((b) => (
              <div
                key={b._id}
                className="booking-card booking-card--upcoming"
              >
                <div className="booking-card__badge">
                  <img src="/plane.png" alt="plane" className="booking-card__badge-icon" />
                </div>

                <div className="mb-[8px]">
                  <p className="booking-card__meta">
                    Booking ID:{" "}
                    <span className="booking-card__meta-value">
                      {b._id.slice(-8)}
                    </span>
                  </p>
                </div>

                <p className="booking-card__status booking-card__status--upcoming">
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </p>

                <div className="booking-card__route">
                  <MapPin className="booking-card__route-icon" />
                  <span>
                    {capitalize(b?.trip?.from ?? "")} → {capitalize(b?.trip?.to ?? "")}
                  </span>
                </div>

                <div className="booking-card__info">
                  <Calendar className="booking-card__info-icon" />
                  <span>{b?.trip?.date ? formatDate(b.trip.date) : "Date unavailable"}</span>
                </div>
                <div className="booking-card__info">
                  <Clock className="booking-card__info-icon" />
                  <span>{b?.trip?.time ?? "Time unavailable"}</span>
                </div>
                <p className="booking-card__text">
                  Seats:{" "}
                  <span className="booking-card__meta-value">
                    {formatSeats(b?.seats)}
                    
                  </span>
                </p>


                <div className="booking-card__footer">
                  <div className="booking-card__gradient booking-card__gradient--upcoming">
                    <div className="booking-card__footer-icon booking-card__footer-icon--plane">
                      <img src="/plane.png" alt="plane" className="booking-card__footer-icon-image" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mybookings-section">
        <h2 className="mybookings-heading">
          Past Bookings
        </h2>

        {pastBookings.length === 0 ? (
          <p className="mybookings-empty">No past bookings found.</p>
        ) : (
          <div className="booking-cards">
            {pastBookings.map((b) => (
              <div
                key={b._id}
                className="booking-card booking-card--past"
              >
                <div className="booking-card__badge">
                  <Train size={16} className="booking-card__badge-icon--train" />
                </div>

                <div className="mb-2">
                  <p className="booking-card__meta">
                    Booking ID:{" "}
                    <span className="booking-card__meta-value">
                      {b._id.slice(-8)}
                    </span>
                  </p>
                </div>

                <p className="booking-card__status booking-card__status--completed">
                  Completed
                </p>

                <div className="booking-card__route">
                  <MapPin className="booking-card__route-icon" />
                  <span>
                    {capitalize(b?.trip?.from ?? "")} → {capitalize(b?.trip?.to ?? "")}
                  </span>
                </div>
                <div className="booking-card__info">
                  <Calendar className="booking-card__info-icon" />
                  {b?.trip?.date ? formatDate(b.trip.date) : "Date unavailable"}
                </div>
                <div className="booking-card__info">
                  <Clock className="booking-card__info-icon" />
                  {b?.trip?.time ?? "Time unavailable"}
                </div>
                <p className="booking-card__text">
                  Seats:{" "}
                  <span className="booking-card__meta-value">
                    {b.seats.join(", ")}
                  </span>
                </p>

                <div className="booking-card__footer">
                  <div className="booking-card__gradient booking-card__gradient--past">
                    <div className="booking-card__footer-icon booking-card__footer-icon--train">
                      <Train size={24} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBookings;