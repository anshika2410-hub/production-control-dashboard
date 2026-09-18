# 🚀 Production Control Dashboard

A production operations dashboard built using **Next.js**, **React**, **TypeScript**, and **Tailwind CSS** as part of a **Frontend Engineer Take-Home Assignment**.

The dashboard is designed as an internal manufacturing operations tool that helps shop-floor managers monitor work orders, track production status, identify delivery risks, and quickly review individual production jobs.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)

![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-black?style=for-the-badge)

---

## 🌐 Live Demo

[![Website](https://img.shields.io/badge/🚀_Live_Dashboard-Open-success?style=for-the-badge)](https://production-control-dashboard-nine.vercel.app/)

[![Source Code](https://img.shields.io/badge/💻_Source_Code-GitHub-black?style=for-the-badge&logo=github)](https://github.com/anshika2410-hub/production-control-dashboard)

---

## 📖 Project Overview

The Production Control Dashboard provides a centralized view of manufacturing work orders and their current production status.

Operations managers can:

- Monitor total, delayed, upcoming, and completed jobs
- Search work orders by Job ID, product, or customer
- Filter jobs by production status
- Sort work orders by due date or quantity
- Review detailed job information
- Update job status directly from the detail panel
- Identify overdue and near-term delivery dates
- Monitor operational KPIs at a glance

The application uses local mock production data because the assignment does not require a backend, authentication system, or database.

---

## ✨ Features

### 📊 Production Overview

Four dynamically calculated operational metrics:

- **Total Work Orders**
- **Delayed Jobs**
- **Due Today / Soon**
- **Completed Jobs**

The metrics automatically update when job statuses change.

### 🔎 Work Order Search

Search work orders using:

- Job ID
- Product name
- Customer

Search is case-insensitive and updates the results dynamically.

### 🎯 Status Filtering

Filter work orders by:

- All Statuses
- Pending
- In Progress
- Delayed
- Completed

### ↕️ Sorting

Sort work orders by:

- Due Date
- Quantity

Both ascending and descending sorting are supported.

### 📋 Job Detail Panel

Clicking a work order opens a right-side detail panel containing:

- Job ID
- Product
- Customer
- Quantity
- Due Date
- Assigned Machine
- Current Status
- Notes / Issues
- Status update controls

### 🔄 State Synchronization

Job status updates are applied to the primary jobs state and automatically synchronize:

- KPI metrics
- Work-order table
- Status filters
- Selected job details

### 🚨 Operational Date Indicators

The dashboard visually identifies:

- Overdue jobs
- Jobs due today
- Upcoming delivery dates

### 📱 Responsive Design

The dashboard is designed for:

- Desktop
- Tablet
- Mobile

The work-order table remains horizontally scrollable on smaller screens while the detail panel adapts to the available viewport.

### ♿ Accessibility

The interface includes:

- Semantic interactive controls
- Keyboard-friendly interactions
- Accessible labels
- Visible focus states
- Appropriate status contrast
- Responsive interaction patterns

---

## 🛠 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**

No external table, chart, dashboard, or UI framework is used.

---

## 📂 Project Structure

```text
production-control-dashboard/
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── dashboard.tsx
│   │   │   ├── filters-search.tsx
│   │   │   ├── job-detail-panel.tsx
│   │   │   ├── jobs-table.tsx
│   │   │   ├── status-badge.tsx
│   │   │   └── summary-metrics.tsx
│   │   │
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── sheet.tsx
│   │       └── table.tsx
│   │
│   ├── data/
│   │   └── mock-jobs.ts
│   │
│   ├── hooks/
│   │   └── use-production-dashboard.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   └── types/
│       └── job.ts
│
├── public/
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

- **Node.js 18 or later** — [Download Node.js](https://nodejs.org/)
- **npm** — Included with Node.js

Verify the installation:

```bash
node -v
npm -v
```

### Clone Repository

```bash
git clone https://github.com/anshika2410-hub/production-control-dashboard.git
```

### Navigate to Project

```bash
cd production-control-dashboard
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

---

## 🧩 Component Architecture

The dashboard follows a component-based architecture where UI responsibilities are separated from state and data logic.

### Dashboard Components

- **`dashboard.tsx`**  
  Main dashboard composition and overall page layout.

- **`summary-metrics.tsx`**  
  Displays dynamically calculated production KPIs.

- **`filters-search.tsx`**  
  Handles search, status filtering, and sorting controls.

- **`jobs-table.tsx`**  
  Displays the production work-order table.

- **`status-badge.tsx`**  
  Reusable status indicator component for different job states.

- **`job-detail-panel.tsx`**  
  Displays detailed information for the selected job and provides status update controls.

### State & Data

- **`use-production-dashboard.ts`**  
  Centralizes dashboard state, filtering, sorting, KPI calculations, job selection, and status updates.

- **`mock-jobs.ts`**  
  Contains the local mock production work-order dataset.

- **`job.ts`**  
  Defines TypeScript types and interfaces used throughout the dashboard.

This separation keeps UI components focused while centralizing the dashboard's data and state management logic.

---

## 📝 Assumptions

The following assumptions were made while implementing the dashboard:

- The application uses local mock data because no backend or database was required.
- Authentication and role-based permissions are outside the scope of the assignment.
- **Due Today / Soon** represents jobs due today through the next 3 calendar days.
- Job status changes are stored in client-side state and reset after a page refresh.
- Machine names, customers, quantities, notes, and dates represent realistic sample manufacturing data.
- The dashboard is intended for internal operations use rather than a customer-facing interface.
- The provided mock dataset is sufficient to demonstrate search, filtering, sorting, status updates, and KPI calculations.

---

## 🎯 Assignment Objectives

The implementation focuses on the core requirements of the Frontend Engineer take-home assignment:

- Operational dashboard design
- Work-order data presentation
- Search and filtering
- Sorting
- KPI calculations
- Job detail interaction
- Status management
- Responsive UI
- Component reusability
- Client-side state management
- Type-safe development
- Clear and maintainable project structure

---

## 🔮 What I Would Improve With More Time

If this dashboard were extended into a production application, I would consider:

- Connecting the dashboard to a real production API
- Persisting job status updates using a backend and database
- Adding loading, API error, and retry states
- Adding pagination or virtualization for large work-order datasets
- Adding date-range filtering
- Adding advanced production filters
- Adding job status history and audit logs
- Adding role-based access for managers and operators
- Adding automated tests for filtering, sorting, KPI calculations, and status updates
- Adding real-time production updates using WebSockets or Server-Sent Events

---

## 📌 Project Status

The dashboard is fully implemented with local mock data and deployed as a live Next.js application on Vercel.

### Verification

- TypeScript compilation: ✅ Passed
- ESLint: ✅ Passed
- Production build: ✅ Passed
- Responsive layout: ✅ Implemented
- Search and filtering: ✅ Implemented
- Sorting: ✅ Implemented
- Job detail panel: ✅ Implemented
- Status updates: ✅ Implemented
- KPI synchronization: ✅ Implemented

---

## 📄 License

This project was created as part of a Frontend Engineer take-home assignment and is intended for evaluation and educational purposes.
