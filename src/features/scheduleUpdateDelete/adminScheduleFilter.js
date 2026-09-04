/**
 * adminScheduleFilter.js
 * Member 2 – Admin schedule list filter.
 */

/**
 * Filters schedules for the admin list by area.
 * Returns all schedules if area is empty (no filter).
 * @param {Array}  schedules – all schedule objects
 * @param {string} area      – filter value (empty = all)
 * @returns {Array}
 */
function filterAdminSchedules(schedules, area) {
  if (!area) return schedules;
  return schedules.filter((s) => s.area === area);
}

export default filterAdminSchedules;
