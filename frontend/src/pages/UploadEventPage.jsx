function UploadEventsPage() {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch("http://localhost:4000/api/upload/upload", {
      method: "POST",
      body: formData
    });

    alert("Upload successful");
  };

  return <input type="file" onChange={handleUpload} />;
}