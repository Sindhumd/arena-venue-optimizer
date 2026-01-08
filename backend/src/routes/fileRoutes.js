router.post("/upload", uploadMiddleware, async (req, res) => {
  try {
    const parsed = await fileParser(req.file.path);
    return res.json({
      success: true,
      data: parsed
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});