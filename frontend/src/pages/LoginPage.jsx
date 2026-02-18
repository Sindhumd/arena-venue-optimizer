import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | register
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        const res = await api.post("/api/auth/login",
          { email, password }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role || "ADMIN");
        window.location.href = "/dashboard";

        navigate("/event-upload");
      } else {
        // UI-only register (no backend)
        alert(
          "Registration request submitted.\nAdmin will create your account."
        );
        setMode("login");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Arena Venue Optimizer
        </h1>

        <p className="text-center text-gray-500 mt-2">
          {mode === "login"
            ? "Sign in to your account"
            : "Request access to the system"}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mt-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {mode === "login" ? "Login" : "Request Access"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have access?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-blue-600 hover:underline"
              >
                Request Access
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}