import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, DoorOpen, User } from "lucide-react";
import Navbar from "../components/Navbar";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { formatSeats } from "../utils/formatSeats";

export default function ViewTicket() {
  
  const location = useLocation();
  const locationState = location.state || {};
  const booking = locationState.booking || locationState;
  const trip = booking?.trip || {};
  const passenger = locationState.passenger || booking?.passenger;
  const seatsArray = Array.isArray(booking?.seats)
    ? booking.seats
    : Array.isArray(locationState.seats)
    ? locationState.seats
    : Array.isArray(trip?.seats)
    ? trip.seats
    : [];
  const priceValue =
    typeof trip?.price === "number"
      ? trip.price
      : typeof booking?.price === "number"
      ? booking.price
      : typeof locationState.price === "number"
      ? locationState.price
      : undefined;

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  });
  const ticketRef = useRef(null);

  const formatDateValue = (iso, fallback = "Date unavailable") => {
    if (!iso) {
      return fallback;
    }

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return fallback;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTimeValue = (value, fallback = "Time unavailable") => {
    if (!value) {
      return fallback;
    }

    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const normalized = typeof value === "string" ? value.trim() : value;

    if (typeof normalized === "string" && normalized.length > 0) {
      const parsedDate = new Date(normalized);

      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      if (/^\d{1,2}:\d{2}(?::\d{2})?\s*(AM|PM)?$/i.test(normalized)) {
        return normalized.toUpperCase();
      }

      return normalized;
    }

    if (typeof normalized === "number" && Number.isFinite(normalized)) {
      const dateFromNumber = new Date(normalized);

      if (!Number.isNaN(dateFromNumber.getTime())) {
        return dateFromNumber.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }

    return fallback;
  };

  const formatPriceValue = (value) => {
    if (typeof value !== "number") {
      return value ?? "—";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const capitalize = (value) => {
    if (typeof value !== "string" || value.length === 0) {
      return "";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const passengerName = passenger?.fullName || userData?.name || "Passenger";
  const passengerAvatar =
    passenger?.avatar || userData?.avatar || "https://randomuser.me/api/portraits/men/32.jpg";
  const routeTitle =
    trip?.airline ||
    [trip?.from, trip?.to].filter(Boolean).join(" → ") ||
    "Your Trip";
  const originDisplay = trip?.fromAddress || trip?.from || "Origin";
  const destinationDisplay = trip?.toAddress || trip?.to || "Destination";
  const departureDisplay = formatTimeValue(
    trip?.departureTime ?? trip?.time
  );
  const arrivalDisplay = formatTimeValue(
    trip?.arrivalTime ?? trip?.estimatedArrival ?? trip?.time,
    formatTimeValue(trip?.time)
  );
  const tripDateDisplay = formatDateValue(trip?.date);
  const gateDisplay = trip?.gate || booking?.gate || "Gate info unavailable";
  const seatDisplay = formatSeats(seatsArray);
  const classDisplay = trip?.classType || capitalize(booking?.status) || "Economy";
  const bookingId = booking?._id || trip?._id || "";
  const boardingPassDisplay =
    trip?.boardingPass ||
    (typeof bookingId === "string" && bookingId.length > 0
      ? bookingId.slice(-6).toUpperCase()
      : "N/A");
  const ticketNumberDisplay =
    trip?.ticketNumber ||
    bookingId ||
    (typeof booking?._id === "string" ? booking._id : "Ticket unavailable");
  const airlineCodeDisplay =
    trip?.airlineCode ||
    [trip?.from, trip?.to]
      .filter(Boolean)
      .map((part) => part.slice(0, 3).toUpperCase())
      .join("") ||
    "TRP";
  const formattedPrice = formatPriceValue(priceValue);
  const qrData = ticketNumberDisplay;
  const passengerCards = seatsArray.length > 0 ? seatsArray : [null];

  const handleDownload = async () => {
    if (!ticketRef.current) {
      toast.error("Ticket is not ready for download.");
      return;
    }

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `ticket_${passengerName.replace(/\s+/g, "_")}.png`;
      link.click();

      toast.success("Ticket downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Download failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen   px-4 sm:px-6 lg:px-1 py-8 ">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-start sm:flex-row sm:items-end justify-between gap-6 w-full max-w-6xl">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{routeTitle}</h1>
            <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
              <span>📍</span>
              {originDisplay}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl font-extrabold text-green-700 leading-tight">
              {formattedPrice}
            </div>
            {/* <button
              onClick={handleDownload}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-5 py-2.5 text-white font-medium shadow hover:bg-[#1E4ED8] transition"
            >
              Download
            </button> */}
          </div>
        </div>

        <div
          id="ticket-wrapper"
          ref={ticketRef}
          className="w-full max-w-6xl space-y-6"
        >
          <div className="flex flex-col lg:flex-row border border-gray-200 bg-white rounded-2xl overflow-hidden">
            <div className="flex lg:flex-col justify-between items-center lg:items-start bg-[#E8EEFF] p-6 gap-6 lg:w-64">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-[30px] font-semibold text-gray-900">{departureDisplay}</div>
                <div className="text-sm text-gray-600 mt-1">{originDisplay}</div>
              </div>

              <div className="flex flex-row lg:flex-col items-center justify-center gap-6">
                <div className="h-11 w-[2px] bg-[#E6E9EE] hidden lg:block" />
                <div className="w-11 h-[2px] bg-[#E6E9EE] lg:hidden" />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#BFC7D6]">
                  <path d="M2 18l7-6-7-6M22 18l-7-6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="h-11 w-[2px] bg-[#E6E9EE] hidden lg:block" />
                <div className="w-11 h-[2px] bg-[#E6E9EE] lg:hidden" />
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-[30px] font-semibold text-gray-900">{arrivalDisplay}</div>
                <div className="text-sm text-gray-600 mt-1">{destinationDisplay}</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between p-6 gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#C5D4FF] px-4 py-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={passengerAvatar}
                    alt="passenger"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#0F172A]">{passengerName}</p>
                    <p className="text-xs text-[#334155] mt-1">Boarding Pass N’{boardingPassDisplay}</p>
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {classDisplay}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <Calendar size={16} />, label: "Date", value: tripDateDisplay },
                  { icon: <Clock size={16} />, label: "Departure", value: departureDisplay },
                  { icon: <DoorOpen size={16} />, label: "Gate", value: gateDisplay },
                  { icon: <User size={16} />, label: "Seat", value: seatDisplay },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#EAF0FF] grid place-items-center text-[#1D4ED8]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#072226]">{airlineCodeDisplay}</p>
                  <p className="text-sm text-gray-600">{ticketNumberDisplay}</p>
                </div>
                <img
                  alt="barcode"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x48&data=${qrData}`}
                  className="w-full max-w-xs h-12 object-cover filter grayscale"
                />
              </div>
            </div>

            <div className="relative lg:w-64 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col justify-between">
              <svg width="246" height="309" viewBox="0 0 246 309" className="absolute left-0 top-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 240 C80 160, 170 120, 210 70" stroke="#2563EB" strokeWidth="3" strokeDasharray="6 6" fill="none" />
              </svg>

              <div className="flex flex-col gap-3">
                {passengerCards.map((seatValue, index) => (
                  <div
                    key={seatValue ?? index}
                    className="flex items-center gap-3 bg-white rounded-lg shadow-md border border-gray-100 px-3 py-2 mt-15"
                  >
                    <img
                      alt="passenger"
                      src={
                        passenger?.avatar ||
                        userData?.avatar ||
                        `https://picsum.photos/48/36?random=${index}`
                      }
                      className="w-12 h-9 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#0F172A]">{passengerName}</span>
                      {seatValue !== null && (
                        <span className="text-xs text-gray-500">Seat {formatSeats([seatValue])}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h2>
            <h3 className="text-base font-semibold text-gray-800 mb-2">Payments</h3>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-3">
              <li>
                If you are purchasing your ticket using a debit or credit card via the Website, we will process these
                payments via the automated secure common payment gateway which will be subject to fraud screening purposes.
              </li>
              <li>
                If you do not supply the correct card billing address and/or cardholder information, your booking will not
                be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is
                declined for any reason or if you have supplied incorrect card information. If we become aware of, or are
                notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be
                cancelled and you will be liable for all costs and expenses arising from such cancellation, etc.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
