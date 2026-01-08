import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <h2>Arena Optimizer</h2>

      <nav>
        {(role === "ADMIN" || role === "OPS") && (
          <Link to="/dashboard">Dashboard</Link>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/events">Events</Link>
            <Link to="/event-upload">Upload Events</Link>
            <Link to="/visitors">Visitors</Link>
            <Link to="/insights">Insights</Link>
          </>
        )}

        {(role === "ADMIN" || role === "SECURITY") && (
          <Link to="/alerts">Alerts</Link>
        )}
      </nav>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;