/**
 * MEMBER 1 - Backend Module
 * File: backend/src/modules/member1_scheduleCreateRead/scheduleCreateRead.controller.js
 *
 * Responsibilities:
 * - Read all schedules with optional filtering
 * - Read single schedule by Area / District
 * - Create a new schedule with validation
 */

import { dataStore } from "../../data/store.js";

/**
 * GET /api/schedules
 * Fetch all schedules, with optional query filters (district, area).
 */
export const getSchedules = (req, res) => {
  try {
    const { district, area } = req.query;
    let result = [...dataStore.schedules];

    if (district) {
      result = result.filter(
        (s) => s.district.toLowerCase() === district.toLowerCase()
      );
    }

    if (area) {
      result = result.filter(
        (s) => s.area.toLowerCase() === area.toLowerCase()
      );
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching schedules.",
      error: error.message,
    });
  }
};

/**
 * GET /api/schedules/area/:areaName
 * Lookup schedule by specific area.
 */
export const getScheduleByArea = (req, res) => {
  try {
    const { areaName } = req.params;
    const schedule = dataStore.schedules.find(
      (s) => s.area.toLowerCase() === decodeURIComponent(areaName).toLowerCase()
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: `No collection schedule found for area "${areaName}".`,
      });
    }

    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while looking up schedule.",
      error: error.message,
    });
  }
};

/**
 * POST /api/schedules
 * Admin creates a new schedule.
 */
export const createSchedule = (req, res) => {
  try {
    const { district, area, lastCollectedDate, nextCollectionDate } = req.body;

    // Validation
    const errors = {};
    if (!district || !district.trim()) errors.district = "Please select a district.";
    if (!area || !area.trim()) errors.area = "Please select a sub-area.";
    if (!lastCollectedDate) errors.lastCollectedDate = "Please select the last collected date.";
    if (!nextCollectionDate) errors.nextCollectionDate = "Please select the next collection date.";

    if (lastCollectedDate && nextCollectionDate && nextCollectionDate < lastCollectedDate) {
      errors.nextCollectionDate = "Next collection date cannot be earlier than the last collected date.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Schedule validation failed.",
        errors,
      });
    }

    const newSchedule = {
      id: Date.now(),
      district: district.trim(),
      area: area.trim(),
      lastCollectedDate,
      nextCollectionDate,
    };

    dataStore.schedules.push(newSchedule);

    return res.status(201).json({
      success: true,
      message: "Schedule created successfully.",
      data: newSchedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating schedule.",
      error: error.message,
    });
  }
};
