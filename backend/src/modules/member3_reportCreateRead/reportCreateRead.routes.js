/**
 * MEMBER 3 - Routes
 * File: backend/src/modules/member3_reportCreateRead/reportCreateRead.routes.js
 */

import { Router } from "express";
import {
  getReports,
  getReportById,
  createReport,
} from "./reportCreateRead.controller.js";

const router = Router();

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", createReport);

export default router;
