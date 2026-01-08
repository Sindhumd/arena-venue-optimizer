export default function Heatmap({ data }) {
  // 1. Safety check
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No heatmap data available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {data.map((item, index) => {
        const density = item.value || 0;

        // 2. Color logic
        let color = "bg-green-500";
        if (density >= 100) color = "bg-red-500";
        else if (density >= 60) color = "bg-yellow-400";

        return (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-5 text-center"
          >
            <h3 className="text-lg font-semibold mb-3">
              {item.zone}
            </h3>

            <div
              className={`h-24 rounded-lg flex items-center justify-center text-white text-xl font-bold ${color}`}
            >
              {density}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Crowd Density
            </p>
          </div>
        );
      })}
    </div>
  );
}