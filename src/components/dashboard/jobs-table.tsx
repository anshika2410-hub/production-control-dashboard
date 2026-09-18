import React from 'react';
import { Job, SortConfig, SortField } from '@/types/job';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Button } from '@/components/ui/button';
import {
  Cpu,
  PackageSearch,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface JobsTableProps {
  jobs: Job[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  sortConfig: SortConfig;
  onToggleSort: (field: SortField) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

function formatDate(dateStr: string): { formatted: string; isOverdue: boolean; isToday: boolean } {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(year, month - 1, day);
  compareDate.setHours(0, 0, 0, 0);

  const isToday = compareDate.getTime() === today.getTime();
  const isOverdue = compareDate.getTime() < today.getTime();

  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return { formatted, isOverdue, isToday };
}

export function JobsTable({
  jobs,
  selectedJobId,
  onSelectJob,
  sortConfig,
  onToggleSort,
  onResetFilters,
  isFiltered,
}: JobsTableProps) {
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="size-3 text-muted-foreground/60 group-hover:text-foreground" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="size-3 text-foreground" />
    ) : (
      <ArrowDown className="size-3 text-foreground" />
    );
  };

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card p-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
          <PackageSearch className="size-6" />
        </div>
        <h3 className="text-base font-semibold text-foreground">No matching work orders found</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          No production jobs match your current search query or status filter criteria.
        </p>
        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="mt-4 gap-1.5 cursor-pointer text-xs"
          >
            <RotateCcw className="size-3.5" />
            Reset all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40 text-xs">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-[110px] font-semibold">Job ID</TableHead>
              <TableHead className="min-w-[180px] font-semibold">Product Name</TableHead>
              <TableHead className="min-w-[140px] font-semibold">Customer</TableHead>
              <TableHead className="w-[120px] font-semibold">
                <button
                  type="button"
                  onClick={() => onToggleSort('quantity')}
                  className="group inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary cursor-pointer"
                  aria-label="Sort by quantity"
                >
                  <span>Quantity</span>
                  {getSortIcon('quantity')}
                </button>
              </TableHead>
              <TableHead className="w-[140px] font-semibold">
                <button
                  type="button"
                  onClick={() => onToggleSort('dueDate')}
                  className="group inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary cursor-pointer"
                  aria-label="Sort by due date"
                >
                  <span>Due Date</span>
                  {getSortIcon('dueDate')}
                </button>
              </TableHead>
              <TableHead className="w-[130px] font-semibold">Status</TableHead>
              <TableHead className="min-w-[160px] font-semibold">Assigned Machine</TableHead>
              <TableHead className="w-[40px] text-right sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => {
              const isSelected = selectedJobId === job.id;
              const dateInfo = formatDate(job.dueDate);

              return (
                <TableRow
                  key={job.id}
                  onClick={() => onSelectJob(job.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectJob(job.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`View details for ${job.id} - ${job.productName}`}
                  className={`group cursor-pointer transition-colors focus:outline-none focus:bg-muted/60 ${
                    isSelected
                      ? 'bg-primary/5 dark:bg-primary/15 font-medium border-l-2 border-l-primary'
                      : 'hover:bg-muted/40'
                  }`}
                >
                  <TableCell className="font-mono text-xs font-semibold text-primary">
                    {job.id}
                  </TableCell>

                  <TableCell className="font-medium text-foreground">
                    <div className="flex flex-col">
                      <span className="truncate max-w-[240px]">{job.productName}</span>
                      {job.notes && (
                        <span className="text-[11px] text-muted-foreground truncate max-w-[240px] font-normal">
                          {job.notes}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground text-xs">
                    {job.customer}
                  </TableCell>

                  <TableCell className="font-mono text-xs">
                    {job.quantity.toLocaleString()} <span className="text-[10px] text-muted-foreground">units</span>
                  </TableCell>

                  <TableCell className="text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono">{dateInfo.formatted}</span>
                      {job.status !== 'Completed' && dateInfo.isOverdue && (
                        <span className="text-[10px] px-1 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-medium">
                          Overdue
                        </span>
                      )}
                      {job.status !== 'Completed' && dateInfo.isToday && (
                        <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-medium">
                          Today
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={job.status} size="sm" />
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="size-3 text-muted-foreground shrink-0" aria-hidden="true" />
                      <span className="truncate max-w-[160px]">{job.machine}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <ChevronRight
                      className="size-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all inline-block"
                      aria-hidden="true"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/20 border-t border-border/60 text-xs text-muted-foreground">
        <span>Showing {jobs.length} work orders</span>
        <span className="text-[11px]">Click any row to view operational parameters and update status</span>
      </div>
    </div>
  );
}
