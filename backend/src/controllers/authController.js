
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "admin";

    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4 )",
      [name, email, hashedPassword, userRole ]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// LOGIN



export const login = async (req, res) => {
  const { email, password } = req.body;

  // Assignment demo admin credentials
  const ADMIN_EMAIL = "admin@arena.com";
  const ADMIN_PASSWORD = "admin123";

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
    { email: ADMIN_EMAIL, role: "admin" },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );

  return res.json({
    message: "Login successful",
    token,
    user: {
      email: ADMIN_EMAIL,
      role: "admin"
    }
  });
};
