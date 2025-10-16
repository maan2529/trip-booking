const searchTrip = (trips = [], filters = {}) => {
  if (!Array.isArray(trips) || trips.length === 0) {
    return [];
  }

  const pickup = filters.pickup?.toString().trim().toLowerCase() || "";
  const destination = filters.destination?.toString().trim().toLowerCase() || "";
  const requestedDate = filters.date?.toString().trim();

  return trips
    .filter((trip) => {
      const from = trip.from?.toString().trim().toLowerCase() || "";
      const to = trip.to?.toString().trim().toLowerCase() || "";
      const pickupMatch = pickup ? from.includes(pickup) : true;
      const destinationMatch = destination ? to.includes(destination) : true;
      const dateMatch = (() => {
        if (!requestedDate) return true;

        if (!trip?.date) return false;

        const parse = (value) => {
          const dateObj = new Date(value);
          if (!Number.isNaN(dateObj.getTime())) {
            return dateObj.toISOString().slice(0, 10);
          }

          if (typeof value === "string" && value.includes("T")) {
            return value.split("T")[0];
          }

          return value;
        };

        return parse(trip.date) === parse(requestedDate);
      })();
      return pickupMatch && destinationMatch && dateMatch;
    })
    .map((trip) => ({
      id: trip._id || trip.id,
      from: trip.from,
      to: trip.to,
      date: trip.date,
      time: trip.time,
      price: trip.price,
      totalSeats: trip.totalSeats,
      availableSeats: trip.availableSeats ?? trip.totalSeats,
    }));
};

export default searchTrip;
