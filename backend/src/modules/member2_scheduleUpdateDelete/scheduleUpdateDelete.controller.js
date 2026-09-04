/**
 * MEMBER 2 - Backend Module
 * File: backend/src/modules/member2_scheduleUpdateDelete/scheduleUpdateDelete.controller.js
 *
 * Responsibilities:
 * - Update existing collection schedule
 * - Delete schedule with ID confirmation
 */

import { dataStore } from "../../data/store.js";

/**
 * PUT /api/schedules/:id
 * Admin updates an existing schedule.
 */
export const updateSchedule = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { district, area, lastCollectedDate, nextCollectionDate } = req.body;

    const index = dataStore.schedules.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Schedule with ID ${id} not found.`,
      });
    }

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
        message: "Schedule update validation failed.",
        errors,
      });
    }

    const updatedSchedule = {
      ...dataStore.schedules[index],
      district: district.trim(),
      area: area.trim(),
      lastCollectedDate,
      nextCollectionDate,
    };

    dataStore.schedules[index] = updatedSchedule;

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully.",
      data: updatedSchedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating schedule.",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/schedules/:id
 * Admin permanently deletes a schedule by ID.
 */
export const deleteSchedule = (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = dataStore.schedules.findIndex((s) => s.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Schedule with ID ${id} not found.`,
      });
    }

    const deleted = dataStore.schedules.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: `Schedule for ${deleted.area} deleted successfully.`,
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting schedule.",
      error: error.message,
    });
  }
};
