# Production Control Dashboard

A high-performance, internal factory operations dashboard designed for operations managers to monitor work orders, track production bottlenecks, review machine allocation, and manage real-time job execution states.

---

## 🚀 Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **UI Primitives**: [shadcn/ui](https://ui.shadcn.com/) (Base UI engine)
* **Icons**: [lucide-react](https://lucide.dev/)

> **Note**: This application is a self-contained front-end demonstration using a typed local mock production dataset. It requires no external database, authentication provider, or backend services.

---

## ✨ Features

1. **Summary KPI Metric Cards**:
   * Dynamically tracks **Total Work Orders**, **Delayed Jobs**, **Due Today / Soon** (within a 3-day delivery window), and **Completed Jobs**.
   * Instant live recalculation whenever a work order's status changes.

2. **Search & Filter Toolbar**:
   * **Multi-field Search**: Real-time, case-insensitive search matching Job ID (e.g., `JOB-1001`), Product Name, or Customer.
   * **Status Filter**: Fast segmented toggling between `All`, `Pending`, `In Progress`, `Delayed`, and `Completed`.
   * **Dual-Field Sorting**: Sort by Due Date or Order Quantity in either Ascending or Descending order.
   * **Reset Filters**: One-click restoration of initial filter and sort parameters.

3. **Production Jobs Table**:
   * Responsive layout with structured columns: Job ID, Product Name, Customer, Quantity, Due Date, Status Badge, and Assigned Machine.
   * High-contrast, semantic status badges with indicators.
   * Date urgency tagging highlighting **Overdue** and **Today** delivery targets.
   * Keyboard accessible row selection (`Tab`, `Enter`, `Space`).

4. **Interactive Job Detail Side Panel (Sheet)**:
   * Accessible right-side drawer displaying full job specifications and floor notes.
   * **Live Status Updater**: Allows the operator to change job status (e.g. from `Delayed` to `In Progress` or `Completed`).
   * **Synchronized State**: Updating a job immediately synchronizes the main table, search pipeline, summary metrics, and active detail view without desynchronization.

5. **Empty State Handling**:
   * Custom empty state illustration with contextual feedback when search filters yield zero results.

---

## 🛠️ Setup & Running Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.18+ or v20+ recommended)
* `npm` (or `pnpm` / `yarn`)

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd Production-Control-Dashboard
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. To run the production build:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Component & Directory Structure

```text
src/
├── app/
│   ├── layout.tsx                # Root layout with fonts, metadata, and body styles
│   ├── page.tsx                  # Home page rendering <Dashboard />
│   └── globals.css               # Global Tailwind CSS and theme design tokens
│
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   └── table.tsx
│   │
│   └── dashboard/                # Domain-specific dashboard components
│       ├── dashboard.tsx         # Main dashboard coordinator & header
│       ├── summary-metrics.tsx   # 4 dynamic KPI cards
│       ├── filters-search.tsx    # Search input, status pills, and sorting controls
│       ├── jobs-table.tsx        # Production work orders table with empty state
│       ├── status-badge.tsx      # Accessible status indicator badges
│       └── job-detail-panel.tsx  # Right slide-over sheet with live status changer
│
├── data/
│   └── mock-jobs.ts              # 12 realistic factory jobs with diverse statuses & machines
│
├── hooks/
│   └── use-production-dashboard.ts # Custom hook managing single-source-of-truth state & memoized pipeline
│
├── lib/
│   └── utils.ts                  # ClassName concatenation utility (cn)
│
└── types/
    └── job.ts                    # TypeScript definitions for Job, JobStatus, and filters
```

---

## 🧠 Data & State Management Approach

* **Single Source of Truth**: The primary `jobs` state array resides inside the `useProductionDashboard` hook.
* **Derived Calculations**: Summary metrics and table views (`filteredAndSortedJobs`) are computed via `useMemo` from `jobs`, `searchQuery`, `statusFilter`, and `sortConfig`.
* **ID-Based Selection (`selectedJobId`)**: Instead of storing a detached `selectedJob` copy in state, the active job is derived by ID (`jobs.find(j => j.id === selectedJobId)`). This guarantees that modifying a job's status updates the table, metrics, and side panel simultaneously in a single React render tick.

---

## 💡 Assumptions

* **Date Format**: Standard ISO dates (`YYYY-MM-DD`) are used in mock data for straightforward lexical/temporal comparison.
* **Due Today / Soon Window**: Work orders with a due date within 3 calendar days of the current date are classified as "Due Soon".
* **Single Factory Environment**: Machine assignments and work orders are assumed to operate within a unified factory facility.

---

## 🔮 Future Enhancements (With More Time)

* **Bulk Actions**: Batch status updates and assignment reassignment for multiple selected work orders.
* **Machine Capacity View**: A secondary tab or lane-based timeline visualizing utilization across specific CNC machines and welding cells.
* **Persistent Storage**: Integration with `localStorage` or REST/GraphQL endpoints with optimistic mutation rollbacks.
* **Exporting**: One-click CSV/PDF export of work orders filtered by shift or status.
