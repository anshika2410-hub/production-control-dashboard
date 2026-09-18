'use client';

import React from 'react';
import { useProductionDashboard } from '@/hooks/use-production-dashboard';
import { SummaryMetrics } from '@/components/dashboard/summary-metrics';
import { FiltersSearch } from '@/components/dashboard/filters-search';
import { JobsTable } from '@/components/dashboard/jobs-table';
import { JobDetailPanel } from '@/components/dashboard/job-detail-panel';
import {
  Factory,
  Calendar,
} from 'lucide-react';

export function Dashboard() {
  const {
    filteredJobs,
    selectedJob,
    summaryMetrics,
    searchQuery,
    statusFilter,
    sortConfig,
    setSearchQuery,
    setStatusFilter,
    setSortConfig,
    toggleSort,
    selectJob,
    clearSelectedJob,
    updateJobStatus,
  } = useProductionDashboard();

  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    sortConfig.field !== 'dueDate' ||
    sortConfig.direction !== 'asc';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSortConfig({ field: 'dueDate', direction: 'asc' });
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-xs supports-backdrop-filter:backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs">
              <Factory className="size-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                Production Control Dashboard
              </h1>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Precision shop-floor scheduling & work order telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground font-mono text-[11px] border">
              <Calendar className="size-3.5" />
              <span>{todayFormatted}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium text-[11px]">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Shift 1 Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Section 1: Summary Metrics */}
        <SummaryMetrics metrics={summaryMetrics} />

        {/* Section 2: Filters & Search Toolbar */}
        <FiltersSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortConfig={sortConfig}
          onSortChange={(field) =>
            setSortConfig((prev) => ({
              field,
              direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
            }))
          }
          onSortDirectionChange={(direction) =>
            setSortConfig((prev) => ({ ...prev, direction }))
          }
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
          totalResults={filteredJobs.length}
        />

        {/* Section 3: Jobs Table */}
        <section aria-label="Production Work Orders Table">
          <JobsTable
            jobs={filteredJobs}
            selectedJobId={selectedJob?.id || null}
            onSelectJob={selectJob}
            sortConfig={sortConfig}
            onToggleSort={toggleSort}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </section>
      </main>

      {/* Section 4: Slide-over Detail Panel */}
      <JobDetailPanel
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={clearSelectedJob}
        onUpdateStatus={updateJobStatus}
      />
    </div>
  );
}
