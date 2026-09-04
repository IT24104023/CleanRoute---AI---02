import { useState } from "react";
import { SlidersHorizontal, CheckCircle2, Clock3 } from "lucide-react";
import AreaFilterSelect from "../../components/filters/AreaFilterSelect";
import EmptyState from "../../components/common/EmptyState";
import ReportCard from "./ReportCard";
import filterReportsByArea from "./reportAreaFilter";

/**
 * ResidentReportList – Member 3
 * Public report list with area filter and quick status tabs.
 * Modernized with clean hierarchy, responsive grid, and visible admin comments.
 * Props:
 *   reports {Array} – all report objects
 *   areas   {Array} – area hierarchy
 */
function ResidentReportList({ reports, areas }) {
  const [filterArea, setFilterArea] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | PENDING | RESOLVED

  // Filter by area first
  const areaFiltered = filterReportsByArea(reports, filterArea);

  // Then filter by status if selected
  const filtered = areaFiltered.filter((r) => {
    if (statusFilter === "PENDING") return r.status === "Pending";
    if (statusFilter === "RESOLVED") return r.status === "Resolved";
    return true;
  });

  const pendingCount = areaFiltered.filter((r) => r.status === "Pending").length;
  const resolvedCount = areaFiltered.filter((r) => r.status === "Resolved").length;

  return (
    <section aria-labelledby="resident-report-list-heading" className="space-y-4">
      {/* Top Controls Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="resident-report-list-heading" className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              Submitted Reports
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                {filtered.length} total
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Review missed collection reports and view official resolution updates from the administrative team.
            </p>
          </div>

          {/* Area Filter Selector */}
          <div className="w-full sm:w-64">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
              <span>Filter by Area</span>
            </div>
            <AreaFilterSelect
              id="resident-report-filter"
              name="filterArea"
              areas={areas}
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Filter Status Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 overflow-x-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
              statusFilter === "ALL"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Reports ({areaFiltered.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("PENDING")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none whitespace-nowrap ${
              statusFilter === "PENDING"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60"
            }`}
          >
            <Clock3 className="w-3.5 h-3.5" aria-hidden="true" />
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("RESOLVED")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none whitespace-nowrap ${
              statusFilter === "RESOLVED"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            Resolved ({resolvedCount})
          </button>
        </div>
      </div>

      {/* Reports Feed */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <EmptyState message="No reports found matching your selected criteria." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ResidentReportList;
