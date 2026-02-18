import { useEffect, useState } from "react";

export default function VenueMap({ data }) {
  const [zoneData, setZoneData] = useState({
    "Zone A": 0,
    "Zone B": 0,
    "Zone C": 0,
    "Zone D": 0,
    "Zone E": 0,
  });

  // Transform incoming data
  useEffect(() => {
    const map = {
      "Zone A": 0,
      "Zone B": 0,
      "Zone C": 0,
      "Zone D": 0,
      "Zone E": 0,
    };

    if (Array.isArray(data)) {
      data.forEach((z) => {
        if (map[z.zone] !== undefined) {
          map[z.zone] = z.value;
        }
      });
    }

    setZoneData(map);
  }, [data]);

  // Color logic
  const getColor = (value) => {
    if (value >= 100) return "bg-red-500";
    if (value >= 70) return "bg-yellow-400";
    return "bg-green-500";
  };

  const ZoneBox = ({ name }) => {
    const value = zoneData[name];

    return (
      <div
        className={`h-28 rounded-lg text-white flex flex-col items-center justify-center font-semibold shadow-md ${getColor(
          value
        )}`}
      >
        <p className="text-lg">{name}</p>
        <p className="text-xl">{value}%</p>
        <p className="text-xs">Crowd Density</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-center">
        Venue Zone Map
      </h2>

      {/* STADIUM STRUCTURE */}
      <div className="grid grid-cols-3 gap-6 items-center text-center">

        {/* Row 1 */}
        <ZoneBox name="Zone A" />
        <ZoneBox name="Zone B" />
        <ZoneBox name="Zone C" />

        {/* Row 2 */}
        <ZoneBox name="Zone D" />

        <div className="h-32 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold bg-white shadow">
          Arena
        </div>

        <ZoneBox name="Zone E" />
      </div>

      {/* Legend */}
      <div className="mt-8 text-sm">
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Normal (&lt; 70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span>Moderate (70% - 99%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Critical (≥ 100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}