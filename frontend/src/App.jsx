import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

import BookingConfirmation from "./pages/BookingConfirmation";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}