import { useEffect, useState } from "react";
import Heatmap from "../components/Heatmap";
import {
  fetchInsights,
  postGenerateInsights,
} from "../services/insightService";

export default function InsightPage() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load insights on page load
  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setLoading(true);
      const data = await fetchInsights();
      setInsights(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  // Trigger backend insight generation (based on uploaded events)
  const handleGenerateInsights = async () => {
    try {
      await postGenerateInsights({});
      await loadInsights(); // re-fetch updated insights
    } catch (err) {
      console.error(err);
      alert("Failed to generate insights");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading insights...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Venue Insights</h1>

      {/* SUMMARY CARDS */}
      {/* SUMMARY CARDS */}
<div className="bg-white shadow rounded-lg p-6 space-y-4 border">
  
  <div>
    <strong>Peak Time:</strong> {insights.peakTime ?? "N/A"}
  </div>

  <div>
    <strong>High Risk Zones:</strong> {insights.highRiskZones ?? 0}
  </div>

  <div>
    <strong>Gate Congestion:</strong>
    {insights.congestion &&
      Object.entries(insights.congestion).map(([gate, percent]) => (
        <p key={gate}>
          {gate}: {percent}%
        </p>
      ))}
  </div>

</div>
      {/* HEATMAP */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-lg font-semibold mb-4">Heatmap</h2>
        <Heatmap data={insights.heatmap} />
      </div>

      {/* ACTION BUTTON */}
      <div>
        <button
          onClick={handleGenerateInsights}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Insights
        </button>
      </div>
    </div>
  );
}