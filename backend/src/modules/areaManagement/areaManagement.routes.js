/**
 * Area Management Routes
 * File: backend/src/modules/areaManagement/areaManagement.routes.js
 */

import { Router } from "express";
import {
  getAreas,
  addDistrict,
  addSubArea,
  deleteDistrict,
  deleteSubArea,
} from "./areaManagement.controller.js";

const router = Router();

router.get("/", getAreas);
router.post("/districts", addDistrict);
router.post("/districts/:districtId/subareas", addSubArea);
router.delete("/districts/:districtId", deleteDistrict);
router.delete("/districts/:districtId/subareas/:subAreaId", deleteSubArea);

export default router;
