import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}