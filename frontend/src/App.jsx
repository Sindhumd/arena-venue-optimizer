import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import EventUploadPage from "./pages/EventUploadPage";
import AlertsPage from "./pages/AlertsPage";
import VisitorsPage from "./pages/VisitorsPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layout/AdminLayout";
import InsightPage from "./pages/InsightPage";

export default function App() {
  return (
    <Routes>

      {/* Login page */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin pages */}
      <Route
        path="/dashboard"
        element={<AdminLayout><DashboardPage /></AdminLayout>}
      />

      <Route
        path="/events"
        element={<AdminLayout><EventsPage /></AdminLayout>}
      />

      <Route
        path="/event-upload"
        element={<AdminLayout><EventUploadPage /></AdminLayout>}
      />

      <Route
        path="/alerts"
        element={<AdminLayout><AlertsPage /></AdminLayout>}
      />

      <Route
        path="/visitors"
        element={<AdminLayout><VisitorsPage /></AdminLayout>}
      />

      <Route
  path="/insights"
  element={
    <AdminLayout>
      <InsightPage />
    </AdminLayout>
  }
/>

    </Routes>
  );
}