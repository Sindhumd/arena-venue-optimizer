import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Navbar />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f4f6f8",
          padding: "20px",
          overflowY: "auto"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}