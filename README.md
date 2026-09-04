# CleanRoute – Waste Collection Schedule & Reporting System

> **SE3090 – Software Engineering Frameworks · Assignment 2 · Mini Hackathon**
> **Phase 1 – Frontend / UI Only**

---

## ⚠ Important Notice

All schedules and reports shown in this application are **Sample / Prototype Data** for demonstration purposes only.
They do **NOT** represent official government, council, or municipal information.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open **http://localhost:5173/** in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx                  – Responsive navigation bar
│   │   ├── Footer.jsx                  – Page footer
│   │   ├── PageHeader.jsx              – Reusable page title banner
│   │   ├── FormError.jsx               – Inline validation error message
│   │   ├── SuccessMessage.jsx          – Success feedback banner
│   │   ├── EmptyState.jsx              – Empty list placeholder
│   │   └── DeleteConfirmationModal.jsx – Shared delete confirm dialog
│   └── filters/
│       └── AreaSelect.jsx              – Shared area dropdown
│
├── features/
│   ├── scheduleCreateRead/             ← MEMBER 1
│   │   ├── ScheduleCreateForm.jsx
│   │   ├── ResidentScheduleView.jsx
│   │   ├── ScheduleCard.jsx
│   │   ├── scheduleCreateValidation.js
│   │   └── scheduleAreaFilter.js
│   │
│   ├── scheduleUpdateDelete/           ← MEMBER 2
│   │   ├── AdminScheduleList.jsx
│   │   ├── EditScheduleModal.jsx
│   │   ├── DeleteScheduleModal.jsx
│   │   ├── scheduleUpdateValidation.js
│   │   └── adminScheduleFilter.js
│   │
│   ├── reportCreateRead/               ← MEMBER 3
│   │   ├── ReportCreateForm.jsx
│   │   ├── ResidentReportList.jsx
│   │   ├── ReportCard.jsx
│   │   ├── reportCreateValidation.js
│   │   └── reportAreaFilter.js
│   │
│   └── reportUpdateDelete/             ← MEMBER 4
│       ├── AdminReportList.jsx
│       ├── EditReportModal.jsx
│       ├── DeleteReportModal.jsx
│       ├── ReportStatusBadge.jsx
│       ├── reportUpdateValidation.js
│       └── reportStatusFilter.js
│
├── pages/
│   ├── Home.jsx                        – Landing page
│   ├── Schedule.jsx                    – Resident schedule view
│   ├── Reports.jsx                     – Report form + list
│   └── Admin.jsx                       – Admin tabbed panel
│
├── data/
│   ├── sampleSchedules.js              – Prototype schedule data
│   └── sampleReports.js                – Prototype report data
│
├── App.jsx                             – Routing + shared React state
├── main.jsx                            – React entry point
└── index.css                           – Global Tailwind styles
```

---

## 👥 Team Member Contributions

### Member 1 – Schedule Create + Read
**Files:** `src/features/scheduleCreateRead/`
- `ScheduleCreateForm.jsx` – Admin form to add a new schedule
- `ResidentScheduleView.jsx` – Area selector + schedule display for residents
- `ScheduleCard.jsx` – Single schedule display card
- `scheduleCreateValidation.js` – Create form validation rules
- `scheduleAreaFilter.js` – Area filter logic for schedule lookup

### Member 2 – Schedule Update + Delete
**Files:** `src/features/scheduleUpdateDelete/`
- `AdminScheduleList.jsx` – Admin table with Edit/Delete actions + area filter
- `EditScheduleModal.jsx` – Edit modal with validation
- `DeleteScheduleModal.jsx` – Delete confirmation dialog
- `scheduleUpdateValidation.js` – Update form validation rules
- `adminScheduleFilter.js` – Area filter for admin schedule list

### Member 3 – Report Create + Read
**Files:** `src/features/reportCreateRead/`
- `ReportCreateForm.jsx` – Resident form to submit a missed collection report
- `ResidentReportList.jsx` – Public report list with area filter + resident edit
- `ReportCard.jsx` – Single report display card with status badge
- `reportCreateValidation.js` – Submit form validation rules
- `reportAreaFilter.js` – Area filter logic for report list

### Member 4 – Report Update + Delete
**Files:** `src/features/reportUpdateDelete/`
- `AdminReportList.jsx` – Admin table with Edit/Status/Delete actions + filters
- `EditReportModal.jsx` – Edit modal (resident: no status; admin: with status)
- `DeleteReportModal.jsx` – Delete confirmation dialog
- `ReportStatusBadge.jsx` – Pending / Resolved status badge component
- `reportUpdateValidation.js` – Update form validation rules
- `reportStatusFilter.js` – Status + area combined filter for admin

---

## 🌿 Technology Stack

| Tool | Version |
|---|---|
| React | 18.x |
| Vite | 5.x |
| Tailwind CSS | 3.x |
| React Router | 6.x |
| Lucide React | 0.441.x |
| Language | JavaScript (no TypeScript) |

---

## 🔀 Recommended Git Branch Strategy

```
feature/schedule-create-read      ← Member 1
feature/schedule-update-delete    ← Member 2
feature/report-create-read        ← Member 3
feature/report-update-delete      ← Member 4
main                              ← Integration branch
```

---

## ✅ Phase 1 Confirmation

| Requirement | Status |
|---|---|
| React + Vite | ✅ |
| Tailwind CSS | ✅ |
| No backend / database | ✅ |
| No LocalStorage persistence | ✅ |
| No authentication | ✅ |
| Shared React state | ✅ |
| All CRUD operations functional | ✅ |
| Validation with friendly messages | ✅ |
| Filtering (area + status) | ✅ |
| Responsive (desktop/tablet/mobile) | ✅ |
| Four feature folders separated | ✅ |
| Sample / Prototype Data labelled | ✅ |
| Resident/Admin permission split | ✅ |

**Phase 2 (backend/persistence) not yet implemented. Awaiting approval.**