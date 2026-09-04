/**
 * MEMBER 4 - Backend Module
 * File: backend/src/modules/member4_reportUpdateDelete/reportUpdateDelete.controller.js
 *
 * Responsibilities:
 * - Update report details (area, date, description)
 * - Update report status (Pending <-> Resolved)
 * - Add/update admin official response comment
 * - Delete report with confirmation
 */

import { dataStore } from "../../data/store.js";

/**
 * PUT /api/reports/:id
 * Admin updates report details, status, or comment.
 */
export const updateReport = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { district, area, collectionDate, description, phone, status, adminComment } = req.body;

    const index = dataStore.reports.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Report with ID ${id} not found.`,
      });
    }

    const errors = {};
    if (district !== undefined && !district.trim()) errors.district = "District cannot be empty.";
    if (area !== undefined && !area.trim()) errors.area = "Sub-area cannot be empty.";
    if (collectionDate !== undefined && !collectionDate) errors.collectionDate = "Collection date cannot be empty.";
    if (description !== undefined && !description.trim()) errors.description = "Description cannot be empty.";

    if (status !== undefined && !["Pending", "Resolved"].includes(status)) {
      errors.status = 'Status must be either "Pending" or "Resolved".';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Report update validation failed.",
        errors,
      });
    }

    const current = dataStore.reports[index];
    const updated = {
      ...current,
      district: district !== undefined ? district.trim() : current.district,
      area: area !== undefined ? area.trim() : current.area,
      collectionDate: collectionDate !== undefined ? collectionDate : current.collectionDate,
      description: description !== undefined ? description.trim() : current.description,
      phone: phone !== undefined ? phone.trim() : current.phone,
      status: status !== undefined ? status : current.status,
      adminComment: adminComment !== undefined ? adminComment.trim() : current.adminComment,
    };

    dataStore.reports[index] = updated;

    return res.status(200).json({
      success: true,
      message: "Report updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating report.",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/reports/:id/status
 * Quick status toggler (Pending <-> Resolved) with optional comment.
 */
export const updateReportStatus = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, adminComment } = req.body;

    const index = dataStore.reports.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Report with ID ${id} not found.`,
      });
    }

    if (status && !["Pending", "Resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "Pending" or "Resolved".',
      });
    }

    const current = dataStore.reports[index];
    const newStatus = status || (current.status === "Pending" ? "Resolved" : "Pending");

    dataStore.reports[index] = {
      ...current,
      status: newStatus,
      adminComment: adminComment !== undefined ? adminComment.trim() : current.adminComment,
    };

    return res.status(200).json({
      success: true,
      message: `Report marked as ${newStatus}.`,
      data: dataStore.reports[index],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating report status.",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/reports/:id
 * Admin permanently deletes a report.
 */
export const deleteReport = (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = dataStore.reports.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Report with ID ${id} not found.`,
      });
    }

    const deleted = dataStore.reports.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: "Report deleted permanently.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting report.",
      error: error.message,
    });
  }
};
