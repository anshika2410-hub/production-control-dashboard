import React from 'react';
import { Job, JobStatus } from '@/types/job';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Button } from '@/components/ui/button';
import {
  Cpu,
  Building2,
  Package,
  Calendar,
  FileText,
} from 'lucide-react';

interface JobDetailPanelProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (jobId: string, newStatus: JobStatus) => void;
}

const statusOptions: {
  status: JobStatus;
  label: string;
  description: string;
}[] = [
  {
    status: 'Pending',
    label: 'Pending',
    description: 'Work order queued; tooling & materials waiting to stage.',
  },
  {
    status: 'In Progress',
    label: 'In Progress',
    description: 'Actively running on designated machine center.',
  },
  {
    status: 'Delayed',
    label: 'Delayed',
    description: 'Halted due to tooling defect, maintenance, or stock shortage.',
  },
  {
    status: 'Completed',
    label: 'Completed',
    description: 'Machining, QA, and inspection passed; ready for dispatch.',
  },
];

export function JobDetailPanel({
  job,
  isOpen,
  onClose,
  onUpdateStatus,
}: JobDetailPanelProps) {
  if (!job) return null;

  const handleStatusChange = (newStatus: JobStatus) => {
    onUpdateStatus(job.id, newStatus);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col justify-between overflow-y-auto p-0 border-l bg-card"
      >
        <div>
          {/* Header */}
          <SheetHeader className="p-5 border-b bg-muted/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {job.id}
              </span>
              <StatusBadge status={job.status} size="sm" />
            </div>
            <SheetTitle className="text-lg font-bold text-foreground leading-snug">
              {job.productName}
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Work order specifications and machine execution details
            </SheetDescription>
          </SheetHeader>

          {/* Details Body */}
          <div className="p-5 space-y-6">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col p-3 rounded-lg border bg-muted/15">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Building2 className="size-3.5" />
                  <span>Customer</span>
                </div>
                <span className="text-sm font-semibold text-foreground truncate" title={job.customer}>
                  {job.customer}
                </span>
              </div>

              <div className="flex flex-col p-3 rounded-lg border bg-muted/15">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Package className="size-3.5" />
                  <span>Order Quantity</span>
                </div>
                <span className="text-sm font-semibold font-mono text-foreground">
                  {job.quantity.toLocaleString()} units
                </span>
              </div>

              <div className="flex flex-col p-3 rounded-lg border bg-muted/15">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Calendar className="size-3.5" />
                  <span>Due Date</span>
                </div>
                <span className="text-sm font-semibold font-mono text-foreground">
                  {job.dueDate}
                </span>
              </div>

              <div className="flex flex-col p-3 rounded-lg border bg-muted/15">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Cpu className="size-3.5" />
                  <span>Assigned Machine</span>
                </div>
                <span className="text-sm font-semibold text-foreground truncate" title={job.machine}>
                  {job.machine}
                </span>
              </div>
            </div>

            {/* Notes & Operational Issues */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <FileText className="size-3.5" />
                <span>Notes & Floor Logs</span>
              </div>
              <div
                className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                  job.notes
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/50 text-foreground'
                    : 'bg-muted/30 border-dashed border-border/80 text-muted-foreground italic'
                }`}
              >
                {job.notes || 'No special notes or operational blockers recorded for this work order.'}
              </div>
            </div>

            {/* Change Status Control */}
            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="status-select"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Update Job Status
                </label>
                <span className="text-[11px] text-muted-foreground">
                  Syncs live across dashboard
                </span>
              </div>

              <div
                id="status-select"
                role="radiogroup"
                aria-label="Job status options"
                className="grid grid-cols-1 gap-2"
              >
                {statusOptions.map((opt) => {
                  const isCurrent = job.status === opt.status;

                  return (
                    <button
                      key={opt.status}
                      type="button"
                      role="radio"
                      aria-checked={isCurrent}
                      onClick={() => handleStatusChange(opt.status)}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-border bg-card hover:bg-muted/50'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <StatusBadge status={opt.status} size="sm" showIcon={false} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          {opt.label}
                          {isCurrent && (
                            <span className="text-[10px] font-normal text-primary font-mono">
                              (Active)
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-muted-foreground mt-0.5">
                          {opt.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="p-4 border-t bg-muted/10">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full text-xs cursor-pointer"
          >
            Close Panel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
