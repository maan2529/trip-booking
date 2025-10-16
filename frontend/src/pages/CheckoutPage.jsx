import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { formatSeats } from "../utils/formatSeats";

const Icon = {
  route: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block mr-3">
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block mr-3">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block mr-3">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  transport: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block mr-3">
      <rect x="3" y="7" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 17v2M17 17v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  seats: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block mr-3">
      <path d="M4 7h16v6H4z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14v4M16 14v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
};

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip, selectedSeats } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const seatCount = (selectedSeats && selectedSeats.length) || 0;
  const farePerSeat = Number(trip?.price || 48);
  const totalFare = farePerSeat * Math.max(1, seatCount);

  const isFormValid = (() => {
    const { fullName, email, phone, cardNumber, cardholderName, expiry, cvv } = formData;
    if (!fullName.trim() || !email.trim() || !phone.trim()) return false;
    if (paymentMethod === "card") {
      return cardNumber.trim() && cardholderName.trim() && expiry.trim() && cvv.trim();
    }
    return true;
  })();

  const handlePayment = () => {
    if (!isFormValid) return;
    toast.success("Payment successful! Booking confirmed.");

    navigate("/confirmation", {
      state: { trip, selectedSeats, totalFare },
      replace: true
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-6 w-full lg:max-w-3xl">
          <h2 className="text-xl font-semibold">Checkout & Payment</h2>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="font-medium text-gray-800 mb-1">Your Information</h3>
            <p className="text-gray-500 text-sm mb-4">
              Please provide your contact details for this booking
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-800 mb-4">Payment Method</h3>

            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 rounded-md px-3 py-2 border ${paymentMethod === "card" ? "bg-blue-50 border-blue-100" : "border-gray-200"
                  } cursor-pointer`}
                onClick={() => setPaymentMethod("card")}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "card" ? "bg-white ring-2 ring-blue-400" : "bg-white"
                    }`}
                >
                  {paymentMethod === "card" ? (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
                <div className="text-sm">Credit or Debit Card</div>
              </label>

              <label
                className={`flex items-center gap-3 rounded-md px-3 py-2 border ${paymentMethod === "wallet" ? "bg-blue-50 border-blue-100" : "border-gray-200"
                  } cursor-pointer`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "wallet" ? "bg-white ring-2 ring-blue-400" : "bg-white"
                    }`}
                >
                  {paymentMethod === "wallet" ? (
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
                <div className="text-sm">Digital Wallet (e.g., PayPal, Apple Pay)</div>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-5 space-y-3">
                <label className="block text-sm text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="**** **** **** ****"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <label className="block text-sm text-gray-700">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  placeholder="Name"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div className="w-full sm:w-28">
                    <label className="block text-sm text-gray-700">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="***"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-96 bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full self-stretch">
          <h3 className="text-gray-800 font-semibold mb-4">Booking Summary</h3>

          <div
            className="rounded-md mb-6 flex items-center justify-center"
            style={{
              height: "92px",
              background:
                "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(2,6,23,0.95))",
              color: "white",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M2 12l20-7-7 20-3-8-10-5z" fill="white" opacity="0.95" />
            </svg>
          </div>

          <div className="text-sm text-gray-700 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center text-gray-600">
                <span style={{ color: "#2563EB" }}>{Icon.route}</span>
                <span>Route:</span>
              </div>
              <div className="text-right text-gray-900">{trip?.from || "New York"} to {trip?.to || "Boston"}</div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center text-gray-600">
                <span style={{ color: "#2563EB" }}>{Icon.calendar}</span>
                <span>Date:</span>
              </div>
              <div className="text-right text-gray-900">{trip?.date || "2024-05-15"}</div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center text-gray-600">
                <span style={{ color: "#2563EB" }}>{Icon.clock}</span>
                <span>Time:</span>
              </div>
              <div className="text-right text-gray-900">{trip?.time || "10:30 AM"}</div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center text-gray-600">
                <span style={{ color: "#2563EB" }}>{Icon.transport}</span>
                <span>Transport:</span>
              </div>
              <div className="text-right text-gray-900">Flight</div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center text-gray-600">
                <span style={{ color: "#2563EB" }}>{Icon.seats}</span>
                <span>Seats:</span>
              </div>
              <div className="text-right text-gray-900">
                {seatCount > 0 ? formatSeats(selectedSeats) : "—"}
              </div>
            </div>
          </div>

          <hr className="my-5 border-gray-200" />

          <div className="flex items-center justify-between">
            <div className="text-gray-700 font-medium">Total Fare:</div>
            <div className="text-blue-600 text-lg font-semibold">USD {totalFare.toFixed(2)}</div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!isFormValid}
            className={`mt-6 w-full py-3 rounded-md text-white font-medium transition ${isFormValid
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-blue-400 cursor-not-allowed"
              }`}
          >
            Complete Payment
          </button>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
