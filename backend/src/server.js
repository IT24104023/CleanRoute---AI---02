/**
 * CleanRoute Express API Server
 * Modular CleanRoute Backend Architecture for SE3090 Assignment 2
 *
 * Divided into 4 Member Modules + Area Management:
 * - Member 1: Schedule Create + Read
 * - Member 2: Schedule Update + Delete
 * - Member 3: Report Create + Read
 * - Member 4: Report Update + Delete
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import member1ScheduleRoutes from "./modules/member1_scheduleCreateRead/scheduleCreateRead.routes.js";
import member2ScheduleRoutes from "./modules/member2_scheduleUpdateDelete/scheduleUpdateDelete.routes.js";
import member3ReportRoutes from "./modules/member3_reportCreateRead/reportCreateRead.routes.js";
import member4ReportRoutes from "./modules/member4_reportUpdateDelete/reportUpdateDelete.routes.js";
import areaRoutes from "./modules/areaManagement/areaManagement.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root health & info endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    project: "CleanRoute – Waste Collection Schedule & Reporting System",
    description: "Phase 2 REST API Backend Architecture",
    version: "1.0.0",
    modules: {
      member1: "Schedule Create + Read (/api/schedules)",
      member2: "Schedule Update + Delete (/api/schedules/:id)",
      member3: "Report Create + Read (/api/reports)",
      member4: "Report Update + Delete (/api/reports/:id)",
      areas: "Area Management (/api/areas)",
    },
    status: "Healthy",
  });
});

// Member 1 & 2 Schedules Mount
// GET /api/schedules, GET /api/schedules/area/:name, POST /api/schedules (Member 1)
app.use("/api/schedules", member1ScheduleRoutes);
// PUT /api/schedules/:id, DELETE /api/schedules/:id (Member 2)
app.use("/api/schedules", member2ScheduleRoutes);

// Member 3 & 4 Reports Mount
// GET /api/reports, GET /api/reports/:id, POST /api/reports (Member 3)
app.use("/api/reports", member3ReportRoutes);
// PUT /api/reports/:id, PATCH /api/reports/:id/status, DELETE /api/reports/:id (Member 4)
app.use("/api/reports", member4ReportRoutes);

// Area Management Mount
app.use("/api/areas", areaRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`CleanRoute Backend running on http://localhost:${PORT}`);
  console.log(`Ready for Member commits and frontend integration`);
  console.log(`=================================================`);
});
