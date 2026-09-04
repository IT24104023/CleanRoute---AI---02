/**
 * MEMBER 1 - Routes
 * File: backend/src/modules/member1_scheduleCreateRead/scheduleCreateRead.routes.js
 */

import { Router } from "express";
import {
  getSchedules,
  getScheduleByArea,
  createSchedule,
} from "./scheduleCreateRead.controller.js";

const router = Router();

router.get("/", getSchedules);
router.get("/area/:areaName", getScheduleByArea);
router.post("/", createSchedule);

export default router;
