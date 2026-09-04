import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Shared components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";

// Initial data
import sampleSchedules from "./data/sampleSchedules";
import sampleReports from "./data/sampleReports";
import DEFAULT_AREAS from "./data/areas";

/**
 * App – root component.
 *
 * Shared React State:
 *   areas     – hierarchical area data (districts + sub-areas), admin-manageable
 *   schedules – collection schedules, admin-created/edited
 *   reports   – missed collection reports, resident-submitted, admin-managed
 *
 * All state is in-memory (React useState). No backend, database, or localStorage.
 * Refreshing the browser resets all data — acceptable for Phase 1.
 */
function App() {
  // ── Area state ─────────────────────────────────────────────────
  const [areas, setAreas] = useState(DEFAULT_AREAS);

  function onAddDistrict(districtName) {
    setAreas((prev) => [
      ...prev,
      { id: Date.now(), district: districtName, subAreas: [] },
    ]);
  }

  function onAddSubArea(districtId, subAreaName) {
    setAreas((prev) =>
      prev.map((d) =>
        d.id === districtId
          ? {
              ...d,
              subAreas: [...d.subAreas, { id: Date.now(), name: subAreaName }],
            }
          : d
      )
    );
  }

  function onDeleteDistrict(districtId) {
    setAreas((prev) => prev.filter((d) => d.id !== districtId));
  }

  function onDeleteSubArea(districtId, subAreaId) {
    setAreas((prev) =>
      prev.map((d) =>
        d.id === districtId
          ? { ...d, subAreas: d.subAreas.filter((s) => s.id !== subAreaId) }
          : d
      )
    );
  }

  // ── Schedule state ──────────────────────────────────────────────
  const [schedules, setSchedules] = useState(sampleSchedules);

  function onAddSchedule(newSchedule) {
    setSchedules((prev) => [...prev, newSchedule]);
  }

  function onUpdateSchedule(updatedSchedule) {
    setSchedules((prev) =>
      prev.map((s) => (s.id === updatedSchedule.id ? updatedSchedule : s))
    );
  }

  function onDeleteSchedule(id) {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  }

  // ── Report state ────────────────────────────────────────────────
  const [reports, setReports] = useState(sampleReports);

  function onSubmitReport(newReport) {
    setReports((prev) => [newReport, ...prev]);
  }

  function onUpdateReport(updatedReport) {
    setReports((prev) =>
      prev.map((r) => (r.id === updatedReport.id ? updatedReport : r))
    );
  }

  function onDeleteReport(id) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/schedule"
              element={<Schedule schedules={schedules} areas={areas} />}
            />

            <Route
              path="/reports"
              element={
                <Reports
                  reports={reports}
                  areas={areas}
                  onSubmitReport={onSubmitReport}
                />
              }
            />

            <Route
              path="/admin"
              element={
                <Admin
                  schedules={schedules}
                  reports={reports}
                  areas={areas}
                  onAddSchedule={onAddSchedule}
                  onUpdateSchedule={onUpdateSchedule}
                  onDeleteSchedule={onDeleteSchedule}
                  onUpdateReport={onUpdateReport}
                  onDeleteReport={onDeleteReport}
                  onAddDistrict={onAddDistrict}
                  onAddSubArea={onAddSubArea}
                  onDeleteDistrict={onDeleteDistrict}
                  onDeleteSubArea={onDeleteSubArea}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
