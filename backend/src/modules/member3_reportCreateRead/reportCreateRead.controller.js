/**
 * MEMBER 3 - Backend Module
 * File: backend/src/modules/member3_reportCreateRead/reportCreateRead.controller.js
 *
 * Responsibilities:
 * - Read all reports (supports filtering by area, district, status)
 * - Read single report by ID
 * - Create a new missed collection report with validation and default "Pending" status
 */

import { dataStore } from "../../data/store.js";

/**
 * GET /api/reports
 * Fetch reports.
 * If req.query.isAdmin is not 'true', phone is hidden from public responses.
 */
export const getReports = (req, res) => {
  try {
    const { district, area, status, isAdmin } = req.query;
    let result = [...dataStore.reports];

    if (district) {
      result = result.filter(
        (r) => r.district.toLowerCase() === district.toLowerCase()
      );
    }

    if (area) {
      result = result.filter(
        (r) => r.area.toLowerCase() === area.toLowerCase()
      );
    }

    if (status) {
      result = result.filter(
        (r) => r.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Protect phone numbers for non-admin public requests
    const formattedResult = result.map((report) => {
      if (isAdmin === "true") {
        return report;
      }
      const { phone, ...publicData } = report;
      return publicData;
    });

    return res.status(200).json({
      success: true,
      count: formattedResult.length,
      data: formattedResult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching reports.",
      error: error.message,
    });
  }
};

/**
 * GET /api/reports/:id
 * Lookup report by ID.
 */
export const getReportById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { isAdmin } = req.query;

    const report = dataStore.reports.find((r) => r.id === id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: `Report with ID ${id} not found.`,
      });
    }

    if (isAdmin !== "true") {
      const { phone, ...publicData } = report;
      return res.status(200).json({ success: true, data: publicData });
    }

    return res.status(200).json({ success: true, data: report });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching report details.",
      error: error.message,
    });
  }
};

/**
 * POST /api/reports
 * Resident creates a new missed collection report.
 * Auto-assigns status: "Pending".
 */
export const createReport = (req, res) => {
  try {
    const { district, area, collectionDate, description, phone } = req.body;

    const errors = {};
    if (!district || !district.trim()) errors.district = "Please select a district.";
    if (!area || !area.trim()) errors.area = "Please select a sub-area.";
    if (!collectionDate) errors.collectionDate = "Please select the collection date.";
    if (!description || !description.trim()) errors.description = "Please enter a short description.";

    if (phone && !/^[0-9+\-\s()]{7,15}$/.test(phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Report validation failed.",
        errors,
      });
    }

    const newReport = {
      id: Date.now(),
      district: district.trim(),
      area: area.trim(),
      collectionDate,
      description: description.trim(),
      phone: phone ? phone.trim() : "",
      status: "Pending", // Strictly always defaults to Pending
      adminComment: "",
    };

    // Prepend new report to top of list
    dataStore.reports.unshift(newReport);

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully.",
      data: newReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating report.",
      error: error.message,
    });
  }
};
