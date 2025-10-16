export const formatSeats = (seats = []) => {
    if (!Array.isArray(seats) || seats.length === 0) {
        return "No seats selected";
    }

    const seatsPerRow = 6;
    return seats
        .map((seatNumber) => {
            if (typeof seatNumber !== "number" || Number.isNaN(seatNumber)) {
                return seatNumber;
            }
            const rowIndex = Math.floor((seatNumber - 1) / seatsPerRow);
            const columnIndex = ((seatNumber - 1) % seatsPerRow) + 1;
            const rowLetter = String.fromCharCode(65 + rowIndex);
            return `${rowLetter}${columnIndex}`;
        })
        .join(", ");
};