import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { formatSeats } from "../utils/formatSeats";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  const {
    trip = {},
    selectedSeats = ["E5", "E6"],
    totalFare = 96,
  } = location.state || {};
  const bookingId = trip.bookingId || "#TXN789456";
  console.log(trip)

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

  const formattedDate = trip.date
    ? new Date(trip.date).toLocaleDateString("en-GB")
    : "26-10-2024";
  const formattedDepartureTime = formatTimeValue(trip?.departureTime ?? trip?.time, "09:30 AM");
  const formattedArrivalTime = formatTimeValue(
    trip?.arrivalTime ?? trip?.estimatedArrival ?? trip?.time,
    "12:00 PM"
  );



  const downloadTicket = () => {
    if (!ticketRef.current) {
      toast.error("Ticket is not ready for download.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=650");

    if (!printWindow) {
      toast.error("Please allow pop-ups to download the ticket.");
      return;
    }

    const clonedTicket = ticketRef.current.cloneNode(true);

    const ticketHtml = clonedTicket.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket - ${bookingId}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 32px; background-color: #f3f4f6; color: #111827; }
            .ticket-wrapper { max-width: 760px; margin: 0 auto; background: #ffffff; border-radius: 18px; border: 1px solid #e5e7eb; box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12); overflow: hidden; }
            .ticket-content { padding: 32px; }
            .ticket-header { background: linear-gradient(90deg, #326FF6 0%, #245BEA 100%); color: #ffffff; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; }
            .ticket-header h1 { font-size: 22px; margin: 0; }
            .ticket-body { padding: 32px; }
            img { max-width: 100%; height: auto; }
            @media print {
              body { background: #ffffff; padding: 0; }
              .ticket-wrapper { box-shadow: none; border: none; }
            }
          </style>
        </head>
        <body>
          <div class="ticket-wrapper">
            <div class="ticket-header">
              <div>
                <h1>Flight Ticket</h1>
                <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Booking ID: ${bookingId}</p>
              </div>
              <div style="transform: rotate(-12deg);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12l20-7-7 20-3-8-10-5z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div class="ticket-content">
              ${ticketHtml}
            </div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
    toast.success("Ticket ready for download.");
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="#16A34A"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-[22px] font-semibold text-gray-900">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Your trip is successfully booked. Enjoy your journey!
          </p>
        </div>

        <div
          ref={ticketRef}
          className="w-full max-w-3xl xl:max-w-4xl relative bg-white rounded-2xl border border-gray-200 shadow-[0_8px_24px_rgba(16,24,40,0.06)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-24 flex items-center justify-between px-6 bg-gradient-to-r from-[#326FF6] to-[#245BEA] text-white rounded-t-2xl">
            <div>
              <p className="text-xl font-semibold">Flight Ticket</p>
              <p className="text-sm opacity-90 mt-1">Booking ID: {bookingId}
              </p>
            </div>
            <div className="transform -rotate-12">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M2 12l20-7-7 20-3-8-10-5z" fill="#fff" />
              </svg>
            </div>
          </div>

          <div className="pt-28 pb-10 px-6 sm:px-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h3 className="text-3xl sm:text-[34px] leading-tight font-extrabold text-gray-900">
                  {trip.from}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{trip.fromCity}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-3">
                  {formattedDepartureTime}
                </p>
              </div>

              <div className="flex-1 md:px-8 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dotted border-gray-300" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-white rounded-full p-1 shadow-sm">
                    <div className="bg-[#2563EB] rounded-full p-[6px] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12l20-7-7 20-3-8-10-5z" fill="#fff" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    {trip.duration || "2h 30min"}
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <h3 className="text-3xl sm:text-[34px] leading-tight font-extrabold text-gray-900">
                  {trip.to || "SFO"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{trip.toCity}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-3">
                  {formattedArrivalTime}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F7F8FA] rounded-lg p-5 border border-transparent shadow-sm">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-base font-semibold text-gray-900 mt-2">
                  {formattedDate}
                </p>
              </div>
              <div className="bg-[#F7F8FA] rounded-lg p-5 border border-transparent shadow-sm">
                <p className="text-sm text-gray-500">Seats</p>
                <p className="text-base font-semibold text-gray-900 mt-2">
                  {formatSeats(selectedSeats)}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-gray-900 font-semibold text-base sm:text-lg">
                Total Fare Paid
              </div>
              <div className="text-green-600 font-extrabold text-2xl sm:text-3xl">
                ${Number(totalFare).toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-[16px] p-4 shadow-md border border-gray-100">
                <img
                  src="/qrCode.jpeg"
                  alt="QR code"
                  width={140}
                  height={140}
                  className="w-32 h-32 sm:w-[140px] sm:h-[140px] rounded-md object-cover"
                />
              </div>
              <p className="text-gray-400 text-sm">Scan this QR code at the boarding gate
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                onClick={downloadTicket}
                className="flex items-center justify-center gap-3 bg-[#2563EB] hover:bg-[#1E4ED8] text-white font-medium px-6 py-3 rounded-xl shadow w-full sm:w-auto"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15V3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">


                <button
                  onClick={() =>
                    navigate(`/viewticket`, {
                      state: {
                        trip,
                        passenger: "Saurabh Gupta",
                        price: totalFare,
                      },
                    })
                  }
                  className="flex items-center justify-center gap-3 border border-[#2563EB] text-[#2563EB] font-medium px-6 py-3 rounded-xl bg-white hover:bg-blue-50 w-full sm:w-auto"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#2563EB" strokeWidth="1.6" />
                    <path d="M12 8v4l2 2" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-lg">View Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default BookingConfirmation;
