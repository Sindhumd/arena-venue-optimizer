export async function uploadEvents(req, res) {
  console.log("FILE:", req.file);
  console.log("BODY:", req.body);

  res.json({
    message: "Reached upload controller",
    file: req.file ? "YES" : "NO",
  });
}