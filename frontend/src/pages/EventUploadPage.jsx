import { useState } from "react";

export default function EventUploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      alert("Events uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">
        <h1 className="text-2xl font-bold mb-2">Upload Events</h1>

        <p className="text-sm text-gray-500 mb-6">
          Upload a CSV file with event name, gate, tickets, and time.
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
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Upload Events
        </button>

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-400 mt-6">
          CSV format:
          <br />
          <span className="font-mono">
            name, gate, tickets, time
          </span>
        </p>
      </div>
    </div>
  );
}