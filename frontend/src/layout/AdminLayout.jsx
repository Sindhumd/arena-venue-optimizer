import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ROLE-BASED SIDEBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}