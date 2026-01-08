import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CongestionChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No congestion data available</p>
      </div>
    );
  }

  const labels = Object.keys(data);
  const values = Object.values(data);

  const colors = values.map((v) =>
    v >= 80 ? "#ef5350" : v >= 50 ? "#ffca28" : "#66bb6a"
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-4">
        Gate-wise Congestion
      </h3>

      {/* CHART */}
      <div className="relative h-[300px]">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Gate Congestion %",
                data: values,
                backgroundColor: colors,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                min: 0,
                max: 100,
                ticks: {
                  callback: (value) => `${value}%`,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </div>

      {/* LEGEND EXPLANATION */}
      <div className="flex gap-6 text-sm mt-4 text-gray-600">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          Low
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          Moderate
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          High
        </span>
      </div>
    </div>
  );
}