import React, { useContext, useMemo } from "react";
import { Users, Clock, Calendar as Cal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TourContext } from "../context/TourBookingContext";

const TripCard = ({ trip}) => {
  
  const navigate = useNavigate();

const handleBooking = () => {
  console.log("Trip Data:", trip);
  // navigate("/booking", { state: { tripId: trip._id, image: tripImage } }); 
   navigate("/booking", { state: { trip } }); 
};


  const { tripImage, rating, reviews } = useMemo(() => {
    const randomImage = `https://picsum.photos/400/300?random=${Math.floor(
      Math.random() * 1000
    )}`;

    const tripImage =
      trip.image && trip.image.trim() !== "" ? trip.image : randomImage;

    const rate = trip.rating || Math.floor(Math.random() * 5) + 1;
    const rev = trip.reviews || Math.floor(Math.random() * 500) + 1;

    return { tripImage, rating: rate, reviews: rev };
  }, [trip._id]);

  const formattedDate = useMemo(() => {
    if (!trip?.date) return "N/A";

    const parsedDate = new Date(trip.date);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString("en-GB");
    }

    const parts = trip.date.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }

    return trip.date;
  }, [trip?.date]);

  return (
    <div className="bg-white rounded-[16px] overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-[389px] shadow-[0_6px_25px_rgba(0,0,0,0.18)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 flex flex-col h-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
        <img src={tripImage} alt={trip.route} className="w-full h-full object-cover" />
        {trip.popular && (
          <span className="absolute top-3 left-3 px-[10px] py-1 text-xs font-semibold text-white rounded-full bg-[#ef4444]">
            Popular
          </span>
        )}
        {trip.discount && (
          <span className="absolute top-3 right-3 px-[10px] py-1 text-xs font-semibold text-white rounded-full bg-[#22c55e]">
            {trip.discount}% OFF
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1 text-sm text-[#f59e0b]">
            <span>{"⭐".repeat(rating)}</span>
            <span className="ml-1.5 text-[#6b7280] text-xs">({reviews} reviews)</span>
          </div>

          <h3 className="text-lg font-semibold text-[#1f2937] text-left">
            {trip.from} → {trip.to}
          </h3>

          <div className="space-y-2">
            <p className="flex items-center text-sm text-[#4b5563]">
              <Clock className="w-4 h-4 mr-2 text-[#2563eb]" /> {trip.duration || trip.time}
            </p>
            <p className="flex items-center text-sm text-[#4b5563]">
              <Users className="w-4 h-4 mr-2 text-[#2563eb]" /> {trip.totalSeats || trip.seats} seats available
            </p>
            <p className="flex items-center text-sm text-[#4b5563]">
              <Cal className="w-4 h-4 mr-2 text-[#2563eb]" /> {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#e5e7eb] pt-3 mt-auto">
          <div>
            <p className="text-lg font-bold text-[#2563eb]">${trip.price}</p>
            {trip.oldPrice && (
              <p className="text-sm text-[#9ca3af] line-through">${trip.oldPrice}</p>
            )}
          </div>

          <button
            onClick={handleBooking}
            className="bg-[#2563eb] text-white font-semibold px-[18px] py-[10px] rounded-lg text-sm shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:bg-[#1d4ed8] hover:scale-105 w-full sm:w-auto text-center"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
