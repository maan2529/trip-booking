import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TourContext } from "../context/TourBookingContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(TourContext); 

  if (!user) {
    toast.error("Please login first!");
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    toast.error("Access only for Admin!");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
