import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import Home from "../pages/HomePage";
import Footer from "../components/Footer";
import BookingPage from "../components/BookingPage";
import CheckoutPage from "../pages/CheckoutPage";
import BookingConfirmation from "../pages/BookingConfirmation";
import ViewTicket from "../pages/ViewTicket";
import AdminDashboard from "../components/admin/AdminDashboard";
import MyBookings from "../pages/MyBookings";
import ProfilePage from "../pages/ProfilePage";
import Profile from '../pages/Profile'
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <Login />
        }
      />
      <Route
        path="/signup"
        element={
            <Signup />
        }
      />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/booking" element={<BookingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
        <Route path="/viewticket" element={<ViewTicket />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/manage" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}