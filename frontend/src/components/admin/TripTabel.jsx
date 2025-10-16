import React from "react";

const TripTable = ({ trips }) => {
  return (
    <div className="section bg-white rounded-3xl shadow-[0_6px_30px_rgba(0,0,0,0.08)] p-4 sm:p-6">
      <div className="section-header flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Trip Management</h3>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
          + Add Trip
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">ID</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">Route</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">Departure</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">Arrival</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">Price</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">Total Seats</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{trip.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">{trip.route}</td>
                <td className="px-4 py-3 whitespace-nowrap">{trip.departure}</td>
                <td className="px-4 py-3 whitespace-nowrap">{trip.arrival}</td>
                <td className="px-4 py-3 whitespace-nowrap">${trip.price.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{trip.seats}</td>
                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                  <button className="action edit inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                    ✏️
                  </button>
                  <button className="action delete inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripTable;
