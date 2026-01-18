import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          }
        />

        {/* Events Table */}
        <Route
          path="/events"
          element={
            <AdminLayout>
              <EventsPage />
            </AdminLayout>
          }
        />

        {/* CSV Upload */}
        <Route
          path="/event-upload"
          element={
            <AdminLayout>
              <EventUploadPage />
            </AdminLayout>
          }
        />

        {/* Alerts */}
        <Route
          path="/alerts"
          element={
            <AdminLayout>
              <AlertsPage />
            </AdminLayout>
          }
        />

        {/* Visitors */}
        <Route
          path="/visitors"
          element={
            <AdminLayout>
              <VisitorsPage />
            </AdminLayout>
          }
        />

        {/* Insights */}
        <Route
          path="/insights"
          element={
            <AdminLayout>
              <InsightPage />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}