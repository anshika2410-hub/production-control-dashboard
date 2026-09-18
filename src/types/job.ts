export type JobStatus = 'Pending' | 'In Progress' | 'Delayed' | 'Completed';

export interface Job {
  id: string;
  productName: string;
  customer: string;
  quantity: number;
  dueDate: string;
  status: JobStatus;
  machine: string;
  notes?: string;
}

export type StatusFilterOption = 'All' | JobStatus;

export type SortField = 'dueDate' | 'quantity';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface SummaryMetrics {
  totalJobs: number;
  delayedJobs: number;
  dueSoonJobs: number;
  completedJobs: number;
}
