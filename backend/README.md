# CleanRoute – Backend API (Phase 2)
## SE3090 – Software Engineering Frameworks · Assignment 2

A modular, clean Express.js REST API supporting the CleanRoute Waste Collection Schedule & Reporting System.

---

## 👥 4-Member Backend Division (For GitHub Commits)

Each team member owns their specific controller and route files, perfectly aligning with their frontend roles:

### 👤 Member 1: Schedule Create + Read
* **Folder**: `backend/src/modules/member1_scheduleCreateRead/`
* **Files**:
  * `scheduleCreateRead.controller.js`
  * `scheduleCreateRead.routes.js`
* **Endpoints**:
  * `GET /api/schedules` - Retrieve all collection schedules (supports `?district=` & `?area=`)
  * `GET /api/schedules/area/:areaName` - Lookup schedule for a specific area
  * `POST /api/schedules` - Admin creates new schedule with strict date order validation
* **Recommended Git Branch**: `member-1-backend-schedule-create-read`
* **Example Commit Message**: `feat(backend): add schedule create and read controllers with date validation`

---

### 👤 Member 2: Schedule Update + Delete
* **Folder**: `backend/src/modules/member2_scheduleUpdateDelete/`
* **Files**:
  * `scheduleUpdateDelete.controller.js`
  * `scheduleUpdateDelete.routes.js`
* **Endpoints**:
  * `PUT /api/schedules/:id` - Admin updates existing collection schedule with validation
  * `DELETE /api/schedules/:id` - Admin permanently deletes schedule with ID confirmation
* **Recommended Git Branch**: `member-2-backend-schedule-update-delete`
* **Example Commit Message**: `feat(backend): implement schedule update and delete endpoints`

---

### 👤 Member 3: Report Create + Read
* **Folder**: `backend/src/modules/member3_reportCreateRead/`
* **Files**:
  * `reportCreateRead.controller.js`
  * `reportCreateRead.routes.js`
* **Endpoints**:
  * `GET /api/reports` - Fetch reports (supports `?status=`, `?area=`, `?district=`; hides phone unless `?isAdmin=true`)
  * `GET /api/reports/:id` - Fetch single report details
  * `POST /api/reports` - Resident submits missed collection report (auto-assigns `"Pending"`, validates inputs)
* **Recommended Git Branch**: `member-3-backend-report-create-read`
* **Example Commit Message**: `feat(backend): add missed collection report creation and public feed endpoints`

---

### 👤 Member 4: Report Update + Delete
* **Folder**: `backend/src/modules/member4_reportUpdateDelete/`
* **Files**:
  * `reportUpdateDelete.controller.js`
  * `reportUpdateDelete.routes.js`
* **Endpoints**:
  * `PUT /api/reports/:id` - Admin updates report details, status, or comment
  * `PATCH /api/reports/:id/status` - Quick status toggle (`Pending` ↔ `Resolved`) with admin response comment
  * `DELETE /api/reports/:id` - Admin deletes a report permanently
* **Recommended Git Branch**: `member-4-backend-report-update-delete`
* **Example Commit Message**: `feat(backend): add report status resolution, comment update, and delete endpoints`

---

## 🗺️ Area Management Module (Shared / Integration)
* **Folder**: `backend/src/modules/areaManagement/`
* **Files**: `areaManagement.controller.js`, `areaManagement.routes.js`
* **Endpoints**:
  * `GET /api/areas` - Retrieve full hierarchical districts & sub-areas
  * `POST /api/areas/districts` - Add new district
  * `POST /api/areas/districts/:districtId/subareas` - Add sub-area to district
  * `DELETE /api/areas/districts/:districtId` - Remove district
  * `DELETE /api/areas/districts/:districtId/subareas/:subAreaId` - Remove sub-area

---

## 🚀 Running the Backend Server

```bash
cd backend
npm install
npm run dev
# or npm start
```
Server runs on **http://localhost:5000**.
