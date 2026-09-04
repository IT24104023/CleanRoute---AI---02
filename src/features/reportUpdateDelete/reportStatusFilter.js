/**
 * reportStatusFilter.js
 * Member 4 – Report status and area filtering.
 */

/**
 * Filters reports by status.
 * Returns all reports if status is empty.
 * @param {Array}  reports – all report objects
 * @param {string} status  – "Pending" | "Resolved" | "" (all)
 * @returns {Array}
 */
function filterReportsByStatus(reports, status) {
  if (!status) return reports;
  return reports.filter((r) => r.status === status);
}

/**
 * Filters reports by both area and status.
 * Empty values are treated as "all".
 * @param {Array}  reports
 * @param {string} area
 * @param {string} status
 * @returns {Array}
 */
function filterAdminReports(reports, area, status) {
  return reports.filter((r) => {
    const matchArea = !area || r.area === area;
    const matchStatus = !status || r.status === status;
    return matchArea && matchStatus;
  });
}

export { filterReportsByStatus, filterAdminReports };
