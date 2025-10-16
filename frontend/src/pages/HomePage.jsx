import React, { useContext, useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import { TourContext } from "../context/TourBookingContext";
import SearchBar from "../components/SearchBar";
import searchTrip from "../utils/searchTrip";



const Home = () => {
  const { tripList, fetchTrips, loading } = useContext(TourContext);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    console.log(tripList)
  }, [])

  useEffect(() => {
    if (Array.isArray(tripList)) {
      setFilteredTrips(tripList);
      setIsFiltered(false);
      setResetSignal((prev) => prev + 1);
    }
  }, [tripList]);

  const handleSearch = (filters) => {
    const results = searchTrip(tripList, filters);
    const filterApplied = Boolean(
      filters.pickup?.trim() || filters.destination?.trim() || filters.date?.trim()
    );

    setFilteredTrips(results);
    setIsFiltered(filterApplied);
  };

  const handleReset = () => {
    setFilteredTrips(tripList);
    setIsFiltered(false);
    setResetSignal((prev) => prev + 1);
  };


  if (loading) return <p>Loading trips...</p>;
  if (!tripList || tripList.length === 0) return <p className="text-center text-gray-500 mt-10 font-semibold text-lg ">No trips available yet.</p>;


  return (
    <div className="w-[100%] space-y-12 ">
      <SearchBar onSearch={handleSearch} resetSignal={resetSignal} />

      <section className="py-5 sm:py-16 bg-white text-center  px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Available Trips</h2>
        <p className="text-gray-500 mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
          Choose from our carefully selected destinations and enjoy a comfortable journey.
        </p>
        {filteredTrips.length === 0 ? (
          <div className="space-y-4">
            <p className="text-gray-500 text-base sm:text-lg">No trips match your search.</p>
            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center bg-white border border-[#d1d5db] text-[#1f2937] px-6 py-3 rounded-[8px] text-sm font-medium transition duration-300 hover:bg-[#f3f4f6]"
              >
                View All Trips
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 place-items-center">
              {filteredTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
            {isFiltered && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center bg-white border border-[#d1d5db] text-[#1f2937] px-6 py-3 rounded-[8px] text-sm font-medium transition duration-300 hover:bg-[#f3f4f6]"
                >
                  View All Trips
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
