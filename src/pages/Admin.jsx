import { useState } from "react";
import { CalendarDays, FileText, MapPin } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import ScheduleCreateForm from "../features/scheduleCreateRead/ScheduleCreateForm";
import AdminScheduleList from "../features/scheduleUpdateDelete/AdminScheduleList";
import AdminReportList from "../features/reportUpdateDelete/AdminReportList";
import AdminAreaManager from "../features/areaManagement/AdminAreaManager";

/**
 * Admin page – tabbed: Schedule Management | Report Management | Area Management
 *
 * Props:
 *   schedules          {Array}
 *   reports            {Array}
 *   areas              {Array}
 *   onAddSchedule      {function}
 *   onUpdateSchedule   {function}
 *   onDeleteSchedule   {function}
 *   onUpdateReport     {function}
 *   onDeleteReport     {function}
 *   onAddDistrict      {function}
 *   onAddSubArea       {function}
 *   onDeleteDistrict   {function}
 *   onDeleteSubArea    {function}
 */
function Admin({
  schedules,
  reports,
  areas,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onUpdateReport,
  onDeleteReport,
  onAddDistrict,
  onAddSubArea,
  onDeleteDistrict,
  onDeleteSubArea,
}) {
  const [activeTab, setActiveTab] = useState("schedules");

  const tabs = [
    { id: "schedules", label: "Schedule Management", shortLabel: "Schedules", icon: CalendarDays },
    { id: "reports", label: "Report Management", shortLabel: "Reports", icon: FileText },
    { id: "areas", label: "Area Management", shortLabel: "Areas", icon: MapPin },
  ];

  return (
    <main>
      <PageHeader
        title="Admin Panel"
        subtitle="Manage collection schedules, resident reports, and service areas."
        badge="Admin"
      />

      <div className="section-container page-section">
        {/* Prototype notice */}
        <div className="notice-amber mb-6">
          <strong>Prototype Notice:</strong> This admin panel has no authentication.
          All data is sample / prototype data for demonstration purposes.
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto" role="tablist" aria-label="Admin sections">
          {tabs.map(({ id, label, shortLabel, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              onClick={() => setActiveTab(id)}
              className={`tab-btn whitespace-nowrap ${
                activeTab === id ? "tab-btn-active" : "tab-btn-inactive"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Schedule Management */}
        <div
          id="panel-schedules"
          role="tabpanel"
          aria-labelledby="tab-schedules"
          hidden={activeTab !== "schedules"}
        >
          {activeTab === "schedules" && (
            <div className="space-y-8">
              <ScheduleCreateForm areas={areas} onAddSchedule={onAddSchedule} />
              <hr className="border-gray-100" />
              <AdminScheduleList
                schedules={schedules}
                areas={areas}
                onUpdateSchedule={onUpdateSchedule}
                onDeleteSchedule={onDeleteSchedule}
              />
            </div>
          )}
        </div>

        {/* Report Management */}
        <div
          id="panel-reports"
          role="tabpanel"
          aria-labelledby="tab-reports"
          hidden={activeTab !== "reports"}
        >
          {activeTab === "reports" && (
            <AdminReportList
              reports={reports}
              areas={areas}
              onUpdateReport={onUpdateReport}
              onDeleteReport={onDeleteReport}
            />
          )}
        </div>

        {/* Area Management */}
        <div
          id="panel-areas"
          role="tabpanel"
          aria-labelledby="tab-areas"
          hidden={activeTab !== "areas"}
        >
          {activeTab === "areas" && (
            <AdminAreaManager
              areas={areas}
              onAddDistrict={onAddDistrict}
              onAddSubArea={onAddSubArea}
              onDeleteDistrict={onDeleteDistrict}
              onDeleteSubArea={onDeleteSubArea}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default Admin;
