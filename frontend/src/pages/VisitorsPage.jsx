import { useEffect, useState } from "react";

export default function VisitorsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setStats({
            totalVisitors: 0,
            peakHour: "N/A",
            peakGate: "N/A",
            zoneMap: {},
          });
          return;
        }

        calculateStats(data);
      })
      .catch(() => {
        setStats({
          totalVisitors: 0,
          peakHour: "N/A",
          peakGate: "N/A",
          zoneMap: {},
        });
      });
  }, []);

  const calculateStats = (data) => {
    let totalVisitors = 0;
    let hourGateMap = {};
    let zoneMap = {};

    data.forEach((e) => {
      const tickets = Number(e.tickets) || 0;
      totalVisitors += tickets;

      // Track hour + gate together
      const hourGateKey = `${e.time}|${e.gate}`;
      hourGateMap[hourGateKey] =
        (hourGateMap[hourGateKey] || 0) + tickets;

      // Dynamic Gate → Zone conversion
      const zone = e.gate.replace("Gate", "Zone");

      zoneMap[zone] = (zoneMap[zone] || 0) + tickets;
    });

    // Find peak hour + gate
    let peakHour = "N/A";
    let peakGate = "N/A";

    if (Object.keys(hourGateMap).length > 0) {
      const peakKey = Object.keys(hourGateMap).reduce((a, b) =>
        hourGateMap[a] > hourGateMap[b] ? a : b
      );

      [peakHour, peakGate] = peakKey.split("|");
    }

    setStats({
      totalVisitors,
      peakHour,
      peakGate,
      zoneMap,
    });
  };

  if (!stats) {
    return (
      <p className="p-6 text-gray-500">
        Loading visitor analytics...
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Visitor Analytics
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500 text-sm">Total Visitors</p>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalVisitors}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500 text-sm">Peak Entry Time</p>
          <p className="text-3xl font-bold text-green-600">
            {stats.peakHour}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-gray-500 text-sm">Peak Entry Gate</p>
          <p className="text-3xl font-bold text-purple-600">
            {stats.peakGate}
          </p>
        </div>
      </div>

      {/* ZONE DISTRIBUTION */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Zone-wise Visitor Distribution
        </h2>

        <div className="space-y-4">
          {Object.entries(stats.zoneMap).map(([zone, count]) => {
            const percentage = stats.totalVisitors
              ? Math.round((count / stats.totalVisitors) * 100)
              : 0;

            const color =
              percentage >= 90
                ? "bg-red-500"
                : percentage >= 70
                ? "bg-yellow-500"
                : "bg-green-500";

            return (
              <div key={zone}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{zone}</span>
                  <span>
                    {count} visitors ({percentage}%)
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${color} h-3 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Visitor analytics are derived from uploaded event ticket data.
        </p>
      </div>
    </div>
  );
}