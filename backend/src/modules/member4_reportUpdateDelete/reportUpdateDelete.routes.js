/**
 * MEMBER 4 - Routes
 * File: backend/src/modules/member4_reportUpdateDelete/reportUpdateDelete.routes.js
 */

import { Router } from "express";
import {
  updateReport,
  updateReportStatus,
  deleteReport,
} from "./reportUpdateDelete.controller.js";

const router = Router();

router.put("/:id", updateReport);
router.patch("/:id/status", updateReportStatus);
router.delete("/:id", deleteReport);

export default router;
