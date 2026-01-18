import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import EventUploadPage from "./pages/EventUploadPage";
import AlertsPage from "./pages/AlertsPage";
import VisitorsPage from "./pages/VisitorsPage";
import InsightPage from "./pages/InsightPage";
import AdminLayout from "./layout/AdminLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event-upload" element={<EventUploadPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/visitors" element={<VisitorsPage />} />
        <Route path="/insights" element={<InsightPage />} />
      </Route>
    </Routes>
  );
}