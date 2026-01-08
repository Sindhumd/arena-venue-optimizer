import { useEffect, useState } from "react";

export default function VenueMap({ data }) {
  const [zoneData, setZoneData] = useState({
    "Zone A": 0,
    "Zone B": 0,
    "Zone C": 0,
  });

  // ✅ Only transform incoming data
  useEffect(() => {
    const map = {
      "Zone A": 0,
      "Zone B": 0,
      "Zone C": 0,
    };

    if (Array.isArray(data)) {
      data.forEach((z) => {
        map[z.zone] = z.value;
      });
    }

    setZoneData(map);
  }, [data]);

  const getColor = (value) => {
    if (value >= 100) return "bg-red-500";
    if (value >= 60) return "bg-yellow-400";
    return "bg-green-500";
  };

  const ZoneBox = ({ name }) => {
    const value = zoneData[name];

    return (
      <div
        className={`h-28 rounded-lg text-white flex flex-col items-center justify-center font-semibold ${getColor(
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
      <h2 className="text-xl font-bold mb-4 text-center">
        Venue Zone Map
      </h2>

      <div className="grid grid-cols-3 grid-rows-3 gap-4 items-center text-center">
        <ZoneBox name="Zone A" />
        <div></div>
        <ZoneBox name="Zone C" />

        <div></div>
        <div className="h-28 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold">
          Arena
        </div>
        <div></div>

        <div></div>
        <ZoneBox name="Zone B" />
        <div></div>
      </div>
    </div>
  );
}