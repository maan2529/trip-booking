import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TourContext = createContext(null);

const TourContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tripList, setTripList] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null)

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/auth/profile`);

      if (res.data.data) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  const createTrip = async (tripData) => {
    console.log("trip kaaa data latest", tripData);
    try {
      const [date, time] = tripData.dateTime.split("T");

      const res = await axiosInstance.post(
        `/trips/create`,
        {
          from: tripData.from,
          to: tripData.to,
          date,
          time,
          price: tripData.price,
          totalSeats: tripData.seats,
        }
      );

      console.log(res);

      if (res.data.success) {
        const newTrip = res.data.data || res.data.trip;
        setTripList((prev) => [...prev, newTrip]);
        toast.success("Trip created successfully!");
      }
    } catch (err) {
      console.error("Error creating trip:", err);
      toast.error("Failed to create trip");
    }
  };

  const updateTrip = async (tripId, formData) => {
    try {
      const [date, time] = formData.dateTime.split('T');

      const tripData = {
        from: formData.from,
        to: formData.to,
        date: date,
        time: time,
        price: parseFloat(formData.price),
        totalSeats: parseInt(formData.seats),
      };

      const res = await axiosInstance.put(
        `/trips/edit/${tripId}`,
        tripData,
      );

      if (res.data.success) {
        toast.success("Trip updated successfully!");
        setTripList((prev) =>
          prev.map((trip) =>
            trip._id === tripId ? { ...trip, ...res.data.data } : trip
          )
        );
        return res.data;
      }
    } catch (error) {
      console.error("Error updating trip:", error);
      toast.error(error.response?.data?.message || "Failed to update trip");
      throw error;
    }
  };

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/trips`);

      if (res.data.success) setTripList(res.data.data || res.data.trips);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const res = await axiosInstance.get(`/bookings/bookings`);

      if (res.data.success) setUserBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
    }
  };

  const createBooking = async (tripId, seats) => {

    try {
      const res = await axiosInstance.post(
        `/bookings/${tripId}`,
        { seats }
      );

      if (res?.data?.success) {
        fetchUserBookings();
        fetchTrips();
        toast.success("Booking created successfully!");
        return res.data;
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      toast.error("Failed to create booking");
      throw err;
    }
  };

  useEffect(() => {
    fetchTrips();
    fetchUser();
    fetchUserBookings();
  }, []);

  return (
    <TourContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        tripList,
        userBookings,
        loading,
        fetchTrips,
        fetchUserBookings,
        createBooking,
        createTrip,
        updateTrip,
        loggedInUser, 
        setLoggedInUser,
      }}
    >
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </TourContext.Provider>
  );
};

export default TourContextProvider;