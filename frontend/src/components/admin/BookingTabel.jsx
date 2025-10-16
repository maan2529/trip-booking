import React from "react";

const BookingTable = ({ bookings }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h3>Booking Management</h3>
        <button className="secondary">Verify QR</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Trip Route</th>
            <th>Date</th>
            <th>Seats</th>
            <th>Status</th>
            <th>QR Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td>{b.user}</td>
              <td>{b.tripRoute}</td>
              <td>{b.date}</td>
              <td>{b.seats}</td>
              <td>
                <span className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>
              </td>
              <td>{b.qrVerified ? "✅" : "⭕"}</td>
              <td>
                <button className="action edit">✏️</button>
                <button className="action delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
