import pool from "../db/pool.js";

const GATE_CAPACITY = {
  "Gate A": 300,
  "Gate B": 400,
  "Gate C": 500
};

export const getHeatmap = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT gate, SUM(tickets) as total FROM events GROUP BY gate"
    );

    const heatmap = rows.map(r => ({
      gate: r.gate,
      value: Math.round((r.total / GATE_CAPACITY[r.gate]) * 100)
    }));

    res.json(heatmap);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Heatmap failed" });
  }
};