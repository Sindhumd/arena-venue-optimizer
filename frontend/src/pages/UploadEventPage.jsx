function UploadEventsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("VITE_API_BASE_URL is undefined");
    return <p>API URL not configured</p>;
  }

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    alert("Upload successful");
  };

  return <input type="file" onChange={handleUpload} />;
}

export default UploadEventsPage;