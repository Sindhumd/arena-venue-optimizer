function UploadEventsPage() {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    alert("Upload successful");
  };

  return <input type="file" onChange={handleUpload} />;
}

export default UploadEventsPage;