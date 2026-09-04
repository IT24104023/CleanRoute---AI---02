import { useState } from "react";
import { Pencil, Trash2, CheckCircle2, SlidersHorizontal, Phone, MessageSquare } from "lucide-react";
import AreaFilterSelect from "../../components/filters/AreaFilterSelect";
import EmptyState from "../../components/common/EmptyState";
import ReportStatusBadge from "./ReportStatusBadge";
import EditReportModal from "./EditReportModal";
import DeleteReportModal from "./DeleteReportModal";
import SuccessMessage from "../../components/common/SuccessMessage";
import { filterAdminReports } from "./reportStatusFilter";

/**
 * AdminReportList – Member 4
 * Full admin view: phone column, adminComment column, Edit/Status/Delete actions.
 * Props:
 *   reports        {Array}
 *   areas          {Array}    – area hierarchy
 *   onUpdateReport {function}
 *   onDeleteReport {function}
 */

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AdminReportList({ reports, areas, onUpdateReport, onDeleteReport }) {
  const [filterArea, setFilterArea] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const filtered = filterAdminReports(reports, filterArea, filterStatus);

  function handleEditReport(r) {
    setEditTarget(r);
    setSuccessMsg("");
  }

  function handleUpdateReport(updated) {
    onUpdateReport(updated);
    setEditTarget(null);
    setSuccessMsg("Report updated successfully.");
  }

  function handleStatusChange(r) {
    const newStatus = r.status === "Pending" ? "Resolved" : "Pending";
    onUpdateReport({ ...r, status: newStatus });
    setSuccessMsg(`Report marked as ${newStatus}.`);
  }

  function handleDeleteReport() {
    onDeleteReport(deleteTargetId);
    setDeleteTargetId(null);
    setSuccessMsg("Report deleted.");
  }

  return (
    <section aria-labelledby="admin-report-list-heading">
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 id="admin-report-list-heading" className="text-base font-bold text-gray-900">
          Report List
          <span className="ml-2 tag bg-gray-100 text-gray-500">{filtered.length}</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-56">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
            <label htmlFor="admin-r-area-filter" className="sr-only">Filter by area</label>
            <AreaFilterSelect
              id="admin-r-area-filter"
              name="filterArea"
              areas={areas}
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-36">
            <label htmlFor="admin-r-status-filter" className="sr-only">Filter by status</label>
            <div className="relative">
              <select
                id="admin-r-status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-input appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {successMsg && <div className="mb-4"><SuccessMessage message={successMsg} /></div>}

      {filtered.length === 0 ? (
        <EmptyState message="No reports found for the selected filters." />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden xl:block overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" aria-hidden="true" /> Phone
                    </span>
                  </th>
                  <th>Status</th>
                  <th>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" aria-hidden="true" /> Comment
                    </span>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <p className="text-[11px] text-gray-400">{r.district}</p>
                      <p className="font-semibold text-gray-900">{r.area}</p>
                    </td>
                    <td className="whitespace-nowrap">{formatDate(r.collectionDate)}</td>
                    <td className="max-w-[160px]">
                      <p className="truncate text-gray-600">{r.description}</p>
                    </td>
                    <td className="whitespace-nowrap text-gray-500">
                      {r.phone || <span className="text-gray-300">—</span>}
                    </td>
                    <td>
                      <ReportStatusBadge status={r.status} />
                    </td>
                    <td className="max-w-[140px]">
                      {r.adminComment ? (
                        <p className="text-xs text-gray-500 italic line-clamp-2">{r.adminComment}</p>
                      ) : (
                        <span className="text-gray-300 text-xs">No comment</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1 flex-wrap">
                        <button
                          onClick={() => handleEditReport(r)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                          aria-label={`Edit report for ${r.area}`}
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                        </button>
                        <button
                          onClick={() => handleStatusChange(r)}
                          className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                          aria-label={`Toggle status for report — currently ${r.status}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          {r.status === "Pending" ? "Resolve" : "Re-open"}
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(r.id)}
                          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                          aria-label={`Delete report for ${r.area}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet/Mobile cards */}
          <div className="xl:hidden space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="card">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="text-xs text-gray-400">{r.district}</p>
                    <p className="font-bold text-gray-900">{r.area}</p>
                  </div>
                  <ReportStatusBadge status={r.status} />
                </div>
                <p className="text-xs text-gray-500 mb-2">{formatDate(r.collectionDate)}</p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{r.description}</p>

                {/* Admin-only fields */}
                {r.phone && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                    <Phone className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                    <span className="font-semibold text-amber-700">Phone:</span> {r.phone}
                  </div>
                )}
                {r.adminComment && (
                  <div className="flex items-start gap-1.5 text-xs text-gray-500 mb-3 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-amber-700">Comment:</span>
                      <p className="text-gray-600 mt-0.5">{r.adminComment}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEditReport(r)}
                    className="flex items-center gap-1 text-xs text-blue-600 font-semibold px-3 py-2 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                  </button>
                  <button
                    onClick={() => handleStatusChange(r)}
                    className="flex items-center gap-1 text-xs text-emerald-600 font-semibold px-3 py-2 rounded-xl border border-emerald-100 hover:bg-emerald-50 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    {r.status === "Pending" ? "Resolve" : "Re-open"}
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(r.id)}
                    className="flex items-center gap-1 text-xs text-red-600 font-semibold px-3 py-2 rounded-xl border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <EditReportModal
        report={editTarget}
        areas={areas}
        onSave={handleUpdateReport}
        onCancel={() => setEditTarget(null)}
      />
      <DeleteReportModal
        isOpen={!!deleteTargetId}
        onConfirm={handleDeleteReport}
        onCancel={() => setDeleteTargetId(null)}
      />
    </section>
  );
}

export default AdminReportList;
