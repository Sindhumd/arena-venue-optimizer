import { useState } from "react";

export default function EventUploadPage() {
  const [file, setFile] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    // ✅ MUST send file, not JSON
    const formData = new FormData();
    formData.append("file", file); // backend expects "file"

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/upload/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Upload failed");
        return;
      }

      alert("Events uploaded successfully");
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">
        <h1 className="text-2xl font-bold mb-2">Upload Events</h1>

        <p className="text-sm text-gray-500 mb-6">
          Upload a CSV file containing event name, gate, ticket count, and entry time.
          This data will be used to analyze crowd congestion, heatmaps, and alerts.
        </p>

        {/* FILE INPUT */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600"
          />
        </div>

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Upload Events
        </button>

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-400 mt-6">
          Ensure the CSV header follows:
          <br />
          <span className="font-mono">
            name,gate,tickets,time
          </span>
        </p>
      </div>
    </div>
  );
}