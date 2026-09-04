/**
 * reportAreaFilter.js
 * Member 3 – Report area filtering.
 */

/**
 * Filters reports by area.
 * Returns all reports if area is empty.
 * @param {Array}  reports – all report objects
 * @param {string} area    – filter value (empty = all)
 * @returns {Array}
 */
function filterReportsByArea(reports, area) {
  if (!area) return reports;
  return reports.filter((r) => r.area === area);
}

export default filterReportsByArea;
