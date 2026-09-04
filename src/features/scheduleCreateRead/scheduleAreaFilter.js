/**
 * scheduleAreaFilter.js
 * Member 1 – Resident schedule area filter.
 */

/**
 * Returns the schedule for a specific area, or null if not found.
 * @param {Array}  schedules – all schedule objects
 * @param {string} area      – selected area name
 * @returns {object|null}
 */
function getScheduleByArea(schedules, area) {
  if (!area) return null;
  return schedules.find((s) => s.area === area) ?? null;
}

/**
 * Returns all schedules matching an area filter.
 * Returns all schedules if area is empty (no filter).
 * @param {Array}  schedules – all schedule objects
 * @param {string} area      – filter value (empty = all)
 * @returns {Array}
 */
function filterSchedulesByArea(schedules, area) {
  if (!area) return schedules;
  return schedules.filter((s) => s.area === area);
}

export { getScheduleByArea, filterSchedulesByArea };
