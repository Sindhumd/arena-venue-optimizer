import { Link } from "react-router-dom";

function Navbar() {
  const role = (localStorage.getItem("role") || "").toUpperCase();

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-blue-400">
        Arena Optimizer
      </h2>

      <nav className="flex flex-col space-y-3">

        {(role === "ADMIN" || role === "OPS") && (
          <>
            <Link to="/event-upload">Upload Events</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/events">Events</Link>
            <Link to="/visitors">Visitors</Link>
            <Link to="/insights">Insights</Link>
          </>
        )}

        {(role === "ADMIN" || role === "SECURITY") && (
          <Link to="/alerts">Alerts</Link>
        )}

      </nav>

      <button
        className="mt-auto bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </aside>
  );
}

export default Navbar;