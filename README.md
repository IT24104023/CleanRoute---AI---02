# CleanRoute – Waste Collection Schedule & Reporting System

> **BSc (Hons) in Information Technology – SE3090 Software Engineering Frameworks**  
> **Year 3 | Semester 1 | 2026 — Assignment 2: Mini Hackathon (Build for Sri Lanka)**

---

## 🔗 Live Application & Repository Links

* **Frontend Live Deployment (Vercel):** [https://clean-route-ai-02.vercel.app/](https://clean-route-ai-02.vercel.app/)
* **Backend API Live Deployment (Render):** [https://cleanroute-ai-02.onrender.com/](https://cleanroute-ai-02.onrender.com/)
* **GitHub Repository:** [https://github.com/IT24104023/CleanRoute---AI---02](https://github.com/IT24104023/CleanRoute---AI---02)
* **2-Minute Demonstration Video:** `[Insert your OneDrive/YouTube video link here]`

---

## 🇱🇰 Selected Sri Lankan Problem

In urban and suburban municipalities across Sri Lanka (such as Colombo, Kaduwela, Battaramulla, and Maharagama), waste collection schedules are frequently unpredictable or unannounced.
Residents and households face three primary pain points:
1. **Uncertainty of Past Collections**: Residents have no clear channel to check when waste collection trucks last serviced their street.
2. **Uncertainty of Upcoming Collections**: Households are left unsure of upcoming collection dates, causing waste bins to accumulate outside or bags to be scavenged by stray animals.
3. **No Closed-Loop Reporting**: When waste collection skips a neighbourhood, citizens have no direct digital platform to report the missed service and receive verified administrative updates on when an emergency or extra collection truck is dispatched.

---

## 💡 Proposed Solution: CleanRoute

**CleanRoute** is a lightweight, responsive public-service web application designed specifically for Sri Lankan residents and local municipal administration:
* **Hierarchical Location Lookup**: Residents drill down from their District (e.g. Malabe, Kaduwela, Battaramulla, Maharagama) to their specific sub-district/town (e.g., Kaduwela Town, Mulleriyawa, Angoda, Thalawathugoda) to view verified last and next collection dates.
* **Community Missed-Collection Reporting**: Residents can submit short reports specifying their area, missed date, and details.
* **Administrative Transparency & Public Status**: Municipal administrators track and resolve reports (`Pending` ↔ `Resolved`), record official public responses/comments, and safely access resident contact numbers for follow-up.
* **Sub-District Area Management**: Admins can dynamically register new districts and sub-areas into the system.

---

## 🛠️ Technologies Used

| Layer | Framework / Library | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **React 18** (Vite 5) | Component architecture and state management |
| **Styling** | **Tailwind CSS 3** | Responsive, mobile-first utility design |
| **Icons** | **Lucide React** | Accessible visual icons |
| **Routing** | **React Router 6** | Client-side routing (`/`, `/schedule`, `/reports`, `/admin`) |
| **Backend API** | **Node.js + Express 4** | Modular REST API service |
| **Middleware** | **CORS & Dotenv** | Cross-origin access and environment configuration |
| **Hosting** | **Vercel** (Frontend) & **Render** (Backend) | 24/7 public cloud deployments with CI/CD |

---

## 🤖 AI Tools Used & Mandatory CLEAR Declaration

In accordance with Section 2.3 of the SE3090 assessment guidelines:

| Tool | Usage in Project | Human Review & Modification |
| :--- | :--- | :--- |
| **Google DeepMind Antigravity / Gemini** | Architectural scaffolding, UI component design, Express REST API modularization, and Git strategy | The team reviewed every component, modified validation logic, ensured Sri Lankan location accuracy, tested CRUD endpoints, and refined responsive CSS. |
| **ChatGPT** | Brainstorming, code generation, project updating and etc. | The team reviewed every component, modified logic as required to ensure the project is successful. |

links:
https://chatgpt.com/share/6a9a6bf0-8840-83ee-8650-1f76dc3881cc
https://chatgpt.com/share/6a9a6c7e-153c-83e8-96bb-22c1327537d6
https://chatgpt.com/share/6a9a6c95-3c2c-83e9-bd4a-5e2a283a3896

---

## 👥 Team Member Details & Meaningful Contributions

In accordance with Section 1.4 of the SE3090 requirements, each registered member took full ownership of a feature module across both Frontend and Backend, maintaining dedicated Git branches and Pull Requests:

### 👤 Member 1: Mohammed Zakee (IT24104023)
* **Assigned Role**: Schedule – Create + Read (Frontend & Backend Lead)
* **Git Branch**: `Zakee` (Pull Request #1 merged into `main`)
* **Typical Focus Area**: Functional Implementation & UI Development
* **Frontend Contributions**:
  * Implemented `ResidentScheduleView.jsx` and `ScheduleCard.jsx` displaying last & next collection dates with Sri Lankan date formatting.
  * Built admin `ScheduleCreateForm.jsx` with input validation enforcing date sequence (`Next Date >= Last Date`).
  * Implemented `scheduleCreateValidation.js` and `scheduleAreaFilter.js`.
* **Backend Contributions**:
  * Developed backend controllers `getSchedules`, `getScheduleByArea`, and `createSchedule` in `backend/src/modules/member1_scheduleCreateRead/`.
  * Defined routes in `scheduleCreateRead.routes.js`.

### 👤 Member 2: Chemini (IT24104054)
* **Assigned Role**: Schedule – Update + Delete
* **Git Branch**: `Chemini` (Pull Request #4 merged into `main`)
* **Typical Focus Area**: Functional Implementation & UI Development
* **Frontend Contributions**:
  * Built `AdminScheduleList.jsx` with responsive table/card views and area filters.
  * Implemented `EditScheduleModal.jsx` and `DeleteScheduleModal.jsx` confirmation dialogs.
  * Implemented `scheduleUpdateValidation.js` and `adminScheduleFilter.js`.
* **Backend Contributions**:
  * Developed backend controllers `updateSchedule` (with strict validation) and `deleteSchedule` in `backend/src/modules/member2_scheduleUpdateDelete/`.
  * Defined routes in `scheduleUpdateDelete.routes.js`.

### 👤 Member 3: Oshini (IT24103874)
* **Assigned Role**: Report – Create + Read
* **Git Branch**: `Oshini` (Pull Request #2 merged into `main`)
* **Typical Focus Area**: Functional Implementation & UI Development
* **Frontend Contributions**:
  * Built resident `ReportCreateForm.jsx` with hierarchical location selector and protected contact number input.
  * Developed `ReportCard.jsx` and `ResidentReportList.jsx` featuring quick status pills (`All`, `Pending`, `Resolved`).
  * Implemented `reportCreateValidation.js` and `reportAreaFilter.js`.
* **Backend Contributions**:
  * Developed backend controllers `getReports` (with resident phone privacy filter) and `createReport` auto-setting status to `"Pending"` in `backend/src/modules/member3_reportCreateRead/`.
  * Defined routes in `reportCreateRead.routes.js`.

### 👤 Member 4: Dinithi Yasasvi (IT24104023/Member 4)
* **Assigned Role**: Report – Update + Delete & Admin Comments
* **Git Branch**: `Diniithi` (Pull Request #3 merged into `main`)
* **Typical Focus Area**: Functional Implementation & UI Development
* **Frontend Contributions**:
  * Built `AdminReportList.jsx` displaying the dedicated **Phone** column and **Admin Comment** response column.
  * Implemented `EditReportModal.jsx` allowing admins to toggle status (`Pending` ↔ `Resolved`) and log official response comments.
  * Implemented `ReportStatusBadge.jsx`, `reportStatusFilter.js`, and `reportUpdateValidation.js`.
* **Backend Contributions**:
  * Developed backend controllers `updateReport`, `updateReportStatus` (PATCH), and `deleteReport` in `backend/src/modules/member4_reportUpdateDelete/`.
  * Defined routes in `reportUpdateDelete.routes.js`.

---


## 💻 Local Installation & Execution

### 1. Frontend (React + Vite)
```bash
# In repository root
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend (Express API)
```bash
cd backend
npm install
npm run dev
```
Server runs on [http://localhost:5000](http://localhost:5000).

---

## 📋 Marking Rubric Self-Check

| Rubric Item (Marks) | Status | Evidence in Project |
| :--- | :---: | :--- |
| **Relevance of Sri Lankan Problem (10)** | ✅ | Solves municipal waste collection uncertainty in Colombo/Kaduwela/Battaramulla/Maharagama. |
| **Practicality & Creativity (15)** | ✅ | Real-world problem, clean two-tier reporting loop, phone privacy protection. |
| **Minimum Functional Requirements (20)** | ✅ | All 10 requirements implemented (Landing page, in-app problem description, forms, validation, filters, responsive UI, sample data). |
| **Quality & Usability of Prototype (15)** | ✅ | Clean modern UI, mobile responsive, graceful validation messages, centered design. |
| **Effective Use of Tech & AI (10)** | ✅ | React, Tailwind, Express modular architecture; full AI declaration logged. |
| **Git Repository & Documentation (10)** | ✅ | 4 separate member branches, meaningful commits, PR merges, complete README. |
| **Successful Deployment (10)** | ✅ | Live on Vercel (`https://clean-route-ai-02.vercel.app/`) and Render (`https://cleanroute-ai-02.onrender.com/`). |
| **2-Minute Demo & Member Contributions (10)** | ✅ | Clear breakdown of each member's contributions and code ownership. |
