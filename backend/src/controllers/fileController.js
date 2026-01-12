export async function uploadEventFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(400).json({ error: "Server error" });
  }
}