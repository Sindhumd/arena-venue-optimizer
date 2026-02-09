import { useEffect, useState } from "react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/alerts`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ FIX: ensure alerts is always an array
        if (Array.isArray(data?.alerts)) {
          setAlerts(data.alerts);
        } else {
          setAlerts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Alerts fetch error", err);
        setAlerts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-gray-500">
        Loading alerts...
      </p>
    );
  }

  const hasHighRisk = alerts.some(
    (a) =>
      a.toLowerCase().includes("high") ||
      a.toLowerCase().includes("zone c")
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Active Alerts
      </h1>

      {/* SUMMARY MESSAGE */}
      {alerts.length > 0 && (
        <div
          className={`mb-6 p-5 rounded-lg border ${
            hasHighRisk
              ? "bg-red-100 border-red-300 text-red-800"
              : "bg-yellow-100 border-yellow-300 text-yellow-800"
          }`}
        >
          <p className="font-semibold">
            ⚠ {alerts.length} active alert(s) detected
          </p>
          <p className="text-sm mt-1">
            Immediate attention is recommended to ensure
            safe crowd movement and venue operations.
          </p>
        </div>
      )}

      {/* NO ALERTS */}
      {alerts.length === 0 ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-5 rounded-lg">
          ✅ No active alerts. Venue operations are normal.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const text = alert.toLowerCase();

            const isHigh =
              text.includes("high") || text.includes("zone c");
            const isMedium = text.includes("zone b");

            const zoneMatch = alert.match(/Zone\s[A-C]/);
            const timeMatch = alert.match(/\d{2}:\d{2}/);

            const zone = zoneMatch ? zoneMatch[0] : "Overall Venue";
            const time = timeMatch ? timeMatch[0] : "N/A";

            const colorClass = isHigh
              ? "bg-red-50 border-red-500 text-red-700"
              : isMedium
              ? "bg-yellow-50 border-yellow-500 text-yellow-700"
              : "bg-blue-50 border-blue-500 text-blue-700";

            const badgeClass = isHigh
              ? "bg-red-600"
              : isMedium
              ? "bg-yellow-500"
              : "bg-blue-600";

            return (
              <div
                key={index}
                className={`border-l-4 p-5 rounded-lg shadow-sm ${colorClass}`}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${badgeClass}`}
                  >
                    {isHigh
                      ? "HIGH RISK"
                      : isMedium
                      ? "MODERATE"
                      : "INFO"}
                  </span>

                  <span className="text-sm font-medium">
                    🕒 {time}
                  </span>
                </div>

                {/* BODY */}
                <p className="font-medium mb-2">
                  {alert}
                </p>

                {/* FOOTER */}
                <div className="text-sm text-gray-700 flex gap-6">
                  <span>📍 {zone}</span>
                  <span>📅 Today</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6">
        * Alerts are generated based on crowd density,
        gate congestion, and predicted peak entry times
        derived from uploaded event data.
      </p>
    </div>
  );
}