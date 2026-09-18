'use client';

import { useState, useMemo, useCallback } from 'react';
import { mockJobs } from '@/data/mock-jobs';
import {
  Job,
  JobStatus,
  StatusFilterOption,
  SortConfig,
  SummaryMetrics,
} from '@/types/job';

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Calculates whether a due date falls within the "Due Today / Soon" window:
 * From today (Day 0) through the next 3 calendar days (Day +3), inclusive.
 * Excludes overdue jobs (diffDays < 0) and jobs due beyond 3 days (diffDays > 3).
 */
function isDueTodayOrSoon(dueDateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = parseLocalDate(dueDateString);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Included if due today (0) or within the next 3 days (1, 2, 3)
  return diffDays >= 0 && diffDays <= 3;
}

export function useProductionDashboard() {
  // Core state
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('All');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'dueDate',
    direction: 'asc',
  });
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Derived selected job (automatically updates when jobs state updates)
  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    return jobs.find((j) => j.id === selectedJobId) || null;
  }, [jobs, selectedJobId]);

  // Derived summary metrics (always computed over current base jobs)
  const summaryMetrics: SummaryMetrics = useMemo(() => {
    let delayedCount = 0;
    let dueSoonCount = 0;
    let completedCount = 0;

    for (const job of jobs) {
      if (job.status === 'Delayed') delayedCount += 1;
      if (job.status === 'Completed') completedCount += 1;
      if (isDueTodayOrSoon(job.dueDate)) dueSoonCount += 1;
    }

    return {
      totalJobs: jobs.length,
      delayedJobs: delayedCount,
      dueSoonJobs: dueSoonCount,
      completedJobs: completedCount,
    };
  }, [jobs]);

  // Derived filtered & sorted jobs list
  const filteredAndSortedJobs = useMemo(() => {
    let list = [...jobs];

    // 1. Search Filter (productName, customer, id)
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (job) =>
          job.productName.toLowerCase().includes(query) ||
          job.customer.toLowerCase().includes(query) ||
          job.id.toLowerCase().includes(query)
      );
    }

    // 2. Status Filter
    if (statusFilter !== 'All') {
      list = list.filter((job) => job.status === statusFilter);
    }

    // 3. Sorting (dueDate or quantity)
    list.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.field === 'dueDate') {
        comparison = a.dueDate.localeCompare(b.dueDate);
      } else if (sortConfig.field === 'quantity') {
        comparison = a.quantity - b.quantity;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return list;
  }, [jobs, searchQuery, statusFilter, sortConfig]);

  // Actions
  const updateJobStatus = useCallback((jobId: string, newStatus: JobStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  }, []);

  const toggleSort = useCallback((field: SortConfig['field']) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return {
        field,
        direction: 'asc',
      };
    });
  }, []);

  const selectJob = useCallback((id: string | null) => {
    setSelectedJobId(id);
  }, []);

  const clearSelectedJob = useCallback(() => {
    setSelectedJobId(null);
  }, []);

  return {
    // States & Derived Data
    jobs,
    filteredJobs: filteredAndSortedJobs,
    selectedJob,
    selectedJobId,
    summaryMetrics,
    searchQuery,
    statusFilter,
    sortConfig,

    // State Setters & Actions
    setSearchQuery,
    setStatusFilter,
    setSortConfig,
    toggleSort,
    selectJob,
    clearSelectedJob,
    updateJobStatus,
  };
}
