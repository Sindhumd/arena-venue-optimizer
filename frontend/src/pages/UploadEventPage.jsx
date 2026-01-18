function UploadEventsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Upload successful");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Events</button>
    </>
  );
}

export default UploadEventsPage;