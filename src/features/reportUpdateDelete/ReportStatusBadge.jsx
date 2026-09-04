/**
 * ReportStatusBadge.jsx
 * Member 4 – Visual badge for report status.
 * Props:
 *   status {string} – "Pending" | "Resolved"
 */

function ReportStatusBadge({ status }) {
  if (status === "Resolved") {
    return (
      <span className="badge-resolved" aria-label="Status: Resolved">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true" />
        Resolved
      </span>
    );
  }

  // Default: Pending
  return (
    <span className="badge-pending" aria-label="Status: Pending">
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" aria-hidden="true" />
      Pending
    </span>
  );
}

export default ReportStatusBadge;
