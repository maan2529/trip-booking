import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const SearchBar = ({ onSearch, resetSignal }) => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setPickup("");
    setDestination("");
    setDate("");
  }, [resetSignal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSearch === "function") {
      onSearch({ pickup, destination, date });
    }
  };

  return (
    <div className="bg-[#e8eeff] w-full  ">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center px-5 sm:px-10 lg:px-16 xl:px-24 py-12 lg:py-16 ">
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] mb-3">
          Find Your Next Journey
        </h2>

        <p className="text-[#6b7280] mb-8 text-base sm:text-lg max-w-2xl">
          Discover available trips and book your seats with ease.
        </p>

        <form onSubmit={handleSubmit} className="w-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] rounded-[12px] px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 sm:flex-wrap sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col text-left flex-1 min-w-[220px]">
            <label className="text-sm sm:text-[15px] text-[#4b5563] mb-2">From</label>
            <div className="flex items-center border border-[#d1d5db] rounded-[8px] px-3 py-2">
              <input
                type="text"
                placeholder="Departure Location"
                className="border-none outline-none w-full text-sm text-[#374151] py-1 px-2"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
              />
              <MapPin className="text-[#9ca3af] w-5 h-5 ml-2" />
            </div>
          </div>

          <div className="flex flex-col text-left flex-1 min-w-[220px]">
            <label className="text-sm sm:text-[15px] text-[#4b5563] mb-2">To</label>
            <div className="flex items-center border border-[#d1d5db] rounded-[8px] px-3 py-2">
              <input
                type="text"
                placeholder="Arrival Location"
                className="border-none outline-none w-full text-sm text-[#374151] py-1 px-2"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
              <MapPin className="text-[#9ca3af] w-5 h-5 ml-2" />
            </div>
          </div>

          <div className="flex flex-col text-left flex-1 min-w-[220px]">
            <label className="text-sm sm:text-[15px] text-[#4b5563] mb-2">Date</label>
            <div className="flex items-center border border-[#d1d5db] rounded-[8px] px-3 py-2">
              <input
                type="date"
                className="border-none outline-none w-full text-sm text-[#374151] py-1 px-2"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-end sm:justify-center w-full sm:w-auto">
            <label className="text-sm sm:text-[15px] text-[#4b5563] mb-2 opacity-0">button</label>
            <button type="submit" className="bg-[#2563eb] text-white px-6 py-3 rounded-[8px] text-sm font-semibold border-none cursor-pointer w-full sm:w-[160px] transition duration-300 hover:bg-[#1d4ed8]">
              Search Trips
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
