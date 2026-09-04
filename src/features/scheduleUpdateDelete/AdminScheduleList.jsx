import { useState } from "react";
import { Pencil, Trash2, SlidersHorizontal } from "lucide-react";
import AreaFilterSelect from "../../components/filters/AreaFilterSelect";
import EmptyState from "../../components/common/EmptyState";
import EditScheduleModal from "./EditScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal";
import SuccessMessage from "../../components/common/SuccessMessage";
import filterAdminSchedules from "./adminScheduleFilter";

/**
 * AdminScheduleList – Member 2
 * Responsive table (desktop) / cards (mobile) with Edit and Delete actions.
 * Props:
 *   schedules        {Array}
 *   areas            {Array}    – area hierarchy
 *   onUpdateSchedule {function}
 *   onDeleteSchedule {function}
 */

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AdminScheduleList({ schedules, areas, onUpdateSchedule, onDeleteSchedule }) {
  const [filterArea, setFilterArea] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const filtered = filterAdminSchedules(schedules, filterArea);

  function handleEditSchedule(s) {
    setEditTarget(s);
    setSuccessMsg("");
  }

  function handleUpdateSchedule(updated) {
    onUpdateSchedule(updated);
    setEditTarget(null);
    setSuccessMsg("Schedule updated successfully.");
  }

  function handleDeleteSchedule() {
    onDeleteSchedule(deleteTarget.id);
    setDeleteTarget(null);
    setSuccessMsg("Schedule deleted.");
  }

  return (
    <section aria-labelledby="admin-sched-list-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 id="admin-sched-list-heading" className="text-base font-bold text-gray-900">
          Schedule List
          <span className="ml-2 tag bg-gray-100 text-gray-500">{filtered.length}</span>
        </h2>
        <div className="flex items-center gap-2 w-full sm:w-60">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
          <label htmlFor="admin-sched-filter" className="sr-only">Filter by area</label>
          <AreaFilterSelect
            id="admin-sched-filter"
            name="filterArea"
            areas={areas}
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
          />
        </div>
      </div>

      {successMsg && <div className="mb-4"><SuccessMessage message={successMsg} /></div>}

      {filtered.length === 0 ? (
        <EmptyState message="No schedules found for the selected area." />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="data-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Sub-area</th>
                  <th>Last Collected</th>
                  <th>Next Collection</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td className="font-medium text-gray-500 text-xs">{s.district}</td>
                    <td className="font-semibold text-gray-900">{s.area}</td>
                    <td>{formatDate(s.lastCollectedDate)}</td>
                    <td className="font-semibold text-green-700">{formatDate(s.nextCollectionDate)}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditSchedule(s)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                          aria-label={`Edit schedule for ${s.area}`}
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(s)}
                          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                          aria-label={`Delete schedule for ${s.area}`}
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

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((s) => (
              <div key={s.id} className="card">
                <p className="text-xs text-gray-400 font-semibold mb-0.5">{s.district}</p>
                <h3 className="font-bold text-gray-900 mb-2">{s.area}</h3>
                <div className="text-sm space-y-1 mb-4">
                  <p><span className="text-gray-500">Last Collected: </span>{formatDate(s.lastCollectedDate)}</p>
                  <p><span className="font-semibold text-green-700">Next Collection: </span><span className="font-bold text-green-700">{formatDate(s.nextCollectionDate)}</span></p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditSchedule(s)} className="flex-1 flex items-center justify-center gap-1 text-xs text-blue-600 font-semibold py-2 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                  </button>
                  <button onClick={() => setDeleteTarget(s)} className="flex-1 flex items-center justify-center gap-1 text-xs text-red-600 font-semibold py-2 rounded-xl border border-red-100 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <EditScheduleModal
        schedule={editTarget}
        areas={areas}
        onSave={handleUpdateSchedule}
        onCancel={() => setEditTarget(null)}
      />
      <DeleteScheduleModal
        schedule={deleteTarget}
        onConfirm={handleDeleteSchedule}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}

export default AdminScheduleList;
