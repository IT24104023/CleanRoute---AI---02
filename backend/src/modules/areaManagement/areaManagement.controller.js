/**
 * CleanRoute - Area Management Controller
 * Supports adding/deleting districts and sub-areas for Sri Lankan regions.
 */

import { dataStore } from "../../data/store.js";

export const getAreas = (req, res) => {
  return res.status(200).json({
    success: true,
    data: dataStore.areas,
  });
};

export const addDistrict = (req, res) => {
  try {
    const { district } = req.body;
    if (!district || !district.trim()) {
      return res.status(400).json({
        success: false,
        message: "District name is required.",
      });
    }

    const trimmed = district.trim();
    if (dataStore.areas.some((d) => d.district.toLowerCase() === trimmed.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `District "${trimmed}" already exists.`,
      });
    }

    const newDistrict = {
      id: Date.now(),
      district: trimmed,
      subAreas: [],
    };

    dataStore.areas.push(newDistrict);

    return res.status(201).json({
      success: true,
      message: "District added successfully.",
      data: newDistrict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding district.",
      error: error.message,
    });
  }
};

export const addSubArea = (req, res) => {
  try {
    const districtId = Number(req.params.districtId);
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Sub-area name is required.",
      });
    }

    const district = dataStore.areas.find((d) => d.id === districtId);
    if (!district) {
      return res.status(404).json({
        success: false,
        message: `District with ID ${districtId} not found.`,
      });
    }

    const trimmed = name.trim();
    if (district.subAreas.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Sub-area "${trimmed}" already exists in ${district.district}.`,
      });
    }

    const newSubArea = {
      id: Date.now(),
      name: trimmed,
    };

    district.subAreas.push(newSubArea);

    return res.status(201).json({
      success: true,
      message: "Sub-area added successfully.",
      data: newSubArea,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding sub-area.",
      error: error.message,
    });
  }
};

export const deleteDistrict = (req, res) => {
  try {
    const districtId = Number(req.params.districtId);
    const index = dataStore.areas.findIndex((d) => d.id === districtId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `District with ID ${districtId} not found.`,
      });
    }

    const deleted = dataStore.areas.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: `District ${deleted.district} deleted successfully.`,
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting district.",
      error: error.message,
    });
  }
};

export const deleteSubArea = (req, res) => {
  try {
    const districtId = Number(req.params.districtId);
    const subAreaId = Number(req.params.subAreaId);

    const district = dataStore.areas.find((d) => d.id === districtId);
    if (!district) {
      return res.status(404).json({
        success: false,
        message: `District with ID ${districtId} not found.`,
      });
    }

    const subIndex = district.subAreas.findIndex((s) => s.id === subAreaId);
    if (subIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Sub-area with ID ${subAreaId} not found in ${district.district}.`,
      });
    }

    const deleted = district.subAreas.splice(subIndex, 1)[0];

    return res.status(200).json({
      success: true,
      message: `Sub-area ${deleted.name} deleted successfully.`,
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting sub-area.",
      error: error.message,
    });
  }
};
