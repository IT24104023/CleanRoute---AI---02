import { Calendar, CalendarCheck, MapPin } from "lucide-react";

/**
 * ScheduleCard – Member 1
 * Displays a single schedule entry for residents.
 * Shows district › sub-area, last collected, and next collection dates.
 */

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ScheduleCard({ schedule }) {
  return (
    <div className="card-hover" role="article" aria-label={`Schedule for ${schedule.area}`}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
        <div>
          {schedule.district && (
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {schedule.district}
            </p>
          )}
          <h2 className="text-xl font-bold text-gray-900">{schedule.area}</h2>
        </div>
        <span className="tag bg-green-50 text-green-700 border border-green-200">
          Active Schedule
        </span>
      </div>

      {/* Date cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Last Collected */}
        <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 flex-shrink-0">
            <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
              Last Collected
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {formatDate(schedule.lastCollectedDate)}
            </p>
          </div>
        </div>

        {/* Next Collection – visually prominent */}
        <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="bg-white rounded-lg p-2 shadow-sm border border-green-100 flex-shrink-0">
            <CalendarCheck className="w-4 h-4 text-green-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-green-600 uppercase tracking-widest mb-1">
              Next Collection
            </p>
            <p className="text-base font-bold text-green-800">
              {formatDate(schedule.nextCollectionDate)}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-gray-300">
        ⚠ Sample / Prototype Data — not official council information.
      </p>
    </div>
  );
}

export default ScheduleCard;
