import { MapPin, Calendar, FileText, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import ReportStatusBadge from "../reportUpdateDelete/ReportStatusBadge";

/**
 * ReportCard – Member 3
 * Public view of a single report with clean modern aesthetics.
 * Displays district/sub-area, date, user's description, and official Admin Comment/Response.
 */

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ReportCard({ report }) {
  const isResolved = report.status === "Resolved";

  return (
    <article
      className="card-hover transition-all duration-200 border border-gray-100 hover:border-gray-200 bg-white"
      aria-label={`Report for ${report.area} on ${formatDate(report.collectionDate)}`}
    >
      {/* Header Row: District & Sub-Area + Status Badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3.5 pb-3 border-b border-gray-100/80">
        <div>
          {report.district && (
            <p className="text-xs font-semibold text-green-700/80 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
              {report.district}
            </p>
          )}
          <h3 className="text-base font-bold text-gray-900 leading-snug">
            {report.area}
          </h3>
        </div>
        <ReportStatusBadge status={report.status} />
      </div>

      {/* Collection Date Row */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 bg-gray-50/80 px-3 py-2 rounded-xl w-fit border border-gray-100">
        <Calendar className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
        <span>Missed Collection Date:</span>
        <span className="font-semibold text-gray-700">{formatDate(report.collectionDate)}</span>
      </div>

      {/* Description Content */}
      <div className="space-y-1.5 mb-4">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
          Resident Report
        </span>
        <div className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed bg-white">
          <FileText className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-300" aria-hidden="true" />
          <p className="whitespace-pre-line">{report.description}</p>
        </div>
      </div>

      {/* Admin Comment / Response Section */}
      <div
        className={`rounded-xl p-3.5 border transition-colors ${
          report.adminComment
            ? isResolved
              ? "bg-emerald-50/60 border-emerald-200/80 text-emerald-950"
              : "bg-amber-50/60 border-amber-200/80 text-amber-950"
            : "bg-gray-50/70 border-gray-100 text-gray-500"
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <MessageSquare
            className={`w-3.5 h-3.5 ${
              report.adminComment
                ? isResolved
                  ? "text-emerald-600"
                  : "text-amber-600"
                : "text-gray-400"
            }`}
            aria-hidden="true"
          />
          <span className="text-xs font-bold uppercase tracking-wider">
            Admin Response / Status Update
          </span>
          {report.adminComment && (
            <span
              className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md ${
                isResolved
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {isResolved ? "Action Complete" : "Under Review"}
            </span>
          )}
        </div>

        {report.adminComment ? (
          <p className="text-xs sm:text-sm leading-relaxed font-medium pl-5">
            "{report.adminComment}"
          </p>
        ) : (
          <p className="text-xs text-gray-400 italic pl-5 flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-300 inline" aria-hidden="true" />
            No official response recorded yet. The administrative team is reviewing this report.
          </p>
        )}
      </div>
    </article>
  );
}

export default ReportCard;
