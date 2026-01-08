import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  // ❗ LOGIC UNCHANGED
  const getStatus = (tickets) => {
    if (tickets > 1200) return "High Crowd";
    if (tickets >= 700) return "Moderate";
    return "Low";
  };

  // Status badge colors (UI only)
  const getStatusStyle = (status) => {
    if (status === "High Crowd")
      return "bg-red-100 text-red-700";
    if (status === "Moderate")
      return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Events Overview
      </h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                Event Name
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                Gate
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                Tickets
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                Time
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {events.map((e, index) => {
              const status = getStatus(e.tickets);

              return (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {e.name}
                  </td>
                  <td className="px-6 py-4">
                    {e.gate}
                  </td>
                  <td className="px-6 py-4">
                    {e.tickets}
                  </td>
                  <td className="px-6 py-4">
                    {e.time}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="p-6 text-gray-500 text-center">
            No events uploaded yet.
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        * Event status is determined based on ticket volume
        and used for congestion and alert analysis.
      </p>
    </div>
  );
}