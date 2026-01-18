import { useEffect, useState } from "react";
import CongestionChart from "../components/CongestionChart";
import Heatmap from "../components/Heatmap";
import VenueMap from "../components/VenueMap";
import generateReport from "../utils/generateReport";

export default function DashboardPage() {
  const [data, setData] = useState({
    totalEvents: 0,
    peakTime: "N/A",
    highRiskZones: 0,
    congestion: {},
    heatmap: {}, // 👈 keep as object (Zone -> %)
    alerts: [],
    report: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("${API_BASE_URL}/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        setData({
          totalEvents: result.totalEvents ?? 0,
          peakTime: result.peakTime ?? "N/A",
          highRiskZones: result.highRiskZones ?? 0,
          congestion: result.congestion ?? {},
          heatmap: result.heatmap ?? {}, // 👈 SAFE
          alerts: result.alerts ??  null ,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading dashboard...</p>;
  }

  // ✅ SAFE heatmap usage (NO forEach)
  const zoneDensity = data.heatmap || {};

  // 🎨 Color logic (same as Heatmap)
  const getZoneColor = (value) => {
    if (value >= 100) return "bg-red-500";
    if (value >= 60) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="p-6 space-y-8">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">Arena Operations Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Events</p>
          <p className="text-3xl font-bold text-blue-600">
            {data.totalEvents}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-sm text-gray-500">High Risk Zones</p>
          <p className="text-3xl font-bold text-red-600">
            {data.highRiskZones}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <p className="text-sm text-gray-500">Predicted Peak Time</p>
          <p className="text-3xl font-bold text-green-600">
            {data.peakTime}
          </p>
        </div>
      </div>

      {/* GATE CONGESTION */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Gate-wise Congestion
        </h2>
        <CongestionChart data={data.congestion} />
      </div>

      {/* HEATMAP */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Live Crowd Density Heatmap
        </h2>
        <Heatmap data={zoneDensity} />
      </div>

      {/* ✅ VENUE ZONE MAP (Phase 4 – Optional but Implemented) */}
<div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-4">
    Venue Zone Map
  </h2>
  <VenueMap  data ={zoneDensity}/>
</div>



      {/* PHASE 4 – ANALYTICS REPORT */}


      <div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-4">
    Analytics Report
  </h2>

  <button
    onClick={() => generateReport(data)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Download PDF Report
  </button>
</div>

      

      {/* ALERTS */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Active Alerts
        </h2>

        {data.alerts.length === 0 ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded">
            ✅ No active alerts. Venue operations are stable.
          </div>
        ) : (
          <ul className="space-y-3">
            {data.alerts.map((a, i) => (
              <li
                key={i}
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded"
              >
                {a}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-gray-400">
        * Dashboard metrics are generated from uploaded event data and
        simulated real-time analytics.
      </p>
    </div>
  );
}