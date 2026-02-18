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
    heatmap: [],
    alerts: [],
    report: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analysis`)
      .then((res) => res.json())
      .then((result) => {
        setData({
          totalEvents: result.totalEvents ?? 0,
          peakTime: result.peakTime ?? "N/A",
          highRiskZones: result.highRiskZones ?? 0,
          congestion: result.congestion ?? {},
          heatmap: result.heatmap ?? [],
          alerts: result.alerts ?? [],
          report: result,
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

  const zoneDensity = Array.isArray(data.heatmap)
    ? data.heatmap
    : [];

  /* ================= SMART ANALYSIS ENGINE ================= */

  const recommendations = [];
  const congestionData = data.congestion || {};

  let highDensityZones = [];
  let mediumDensityZones = [];

  zoneDensity.forEach((zone) => {
    const density =
      zone.value ??
      zone.density ??
      zone.score ??
      0;

    const zoneName =
      zone.name ??
      zone.zone ??
      zone.id ??
      "Zone";

    if (density >= 85) {
      highDensityZones.push(zoneName);
    } else if (density >= 60) {
      mediumDensityZones.push(zoneName);
    }
  });

  if (highDensityZones.length > 0) {
    recommendations.push(
      `Critical crowd density in ${highDensityZones.join(
        ", "
      )}. Deploy emergency staff and restrict inflow.`
    );
  }

  if (mediumDensityZones.length > 0) {
    recommendations.push(
      `Moderate crowd build-up in ${mediumDensityZones.join(
        ", "
      )}. Monitor closely and prepare standby staff.`
    );
  }

  let highestGate = null;
  let highestGateValue = 0;

  Object.entries(congestionData).forEach(([gate, value]) => {
    if (value > highestGateValue) {
      highestGateValue = value;
      highestGate = gate;
    }
  });

  if (highestGateValue >= 75) {
    recommendations.push(
      `${highestGate} congestion at ${highestGateValue}%. Open additional lanes or reroute crowd.`
    );
  }

  const overallRiskScore =
    highDensityZones.length * 2 +
    mediumDensityZones.length * 1 +
    (highestGateValue > 70 ? 2 : 0) +
    (data.alerts.length > 0 ? 2 : 0);

  if (overallRiskScore >= 5) {
    recommendations.push(
      "Overall venue risk level: HIGH. Activate full safety protocol."
    );
  } else if (overallRiskScore >= 3) {
    recommendations.push(
      "Overall venue risk level: MODERATE. Increase monitoring."
    );
  } else {
    recommendations.push(
      "Overall venue risk level: LOW. Operations stable."
    );
  }

  if (data.peakTime && data.peakTime !== "N/A") {
    recommendations.push(
      `Peak expected at ${data.peakTime}. Allocate maximum staff before this time.`
    );
  }

  /* ========================================================== */

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        Arena Operations Dashboard
      </h1>

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

      {/* VENUE MAP */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Venue Zone Map
        </h2>
        <VenueMap data={zoneDensity} />
      </div>

      {/* SMART RECOMMENDATIONS */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Smart Recommendations
        </h2>

        <ul className="space-y-3">
          {recommendations.map((rec, index) => {
            let style = "border border-green-300 bg-green-50";

            if (rec.includes("Critical") || rec.includes("HIGH")) {
              style = "border border-red-500 bg-red-50";
            } else if (rec.includes("Moderate")) {
              style = "border border-yellow-400 bg-yellow-50";
            }

            return (
              <li
                key={index}
                className={`${style} p-4 rounded`}
              >
                {rec}
              </li>
            );
          })}
        </ul>
      </div>

      {/* REPORT */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Analytics Report
        </h2>
        <button
          onClick={() => generateReport(data.report)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
            No active alerts. Venue operations are stable.
          </div>
        ) : (
          <ul className="space-y-3">
            {data.alerts.map((a, i) => (
              <li
                key={i}
                className="border border-red-500 bg-red-50 p-4 rounded"
              >
                {a}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}