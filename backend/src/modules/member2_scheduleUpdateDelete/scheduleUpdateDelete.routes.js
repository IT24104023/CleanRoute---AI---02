/**
 * MEMBER 2 - Routes
 * File: backend/src/modules/member2_scheduleUpdateDelete/scheduleUpdateDelete.routes.js
 */

import { Router } from "express";
import {
  updateSchedule,
  deleteSchedule,
} from "./scheduleUpdateDelete.controller.js";

const router = Router();

router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;
