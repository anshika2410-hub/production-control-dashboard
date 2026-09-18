import React from 'react';
import { JobStatus } from '@/types/job';
import { cn } from '@/lib/utils';
import {
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
  size?: 'sm' | 'default';
  showIcon?: boolean;
}

const statusConfig: Record<
  JobStatus,
  {
    label: string;
    icon: LucideIcon;
    bgClass: string;
    textClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  Pending: {
    label: 'Pending',
    icon: Clock,
    bgClass: 'bg-slate-100 dark:bg-slate-800/60',
    textClass: 'text-slate-700 dark:text-slate-300',
    borderClass: 'border-slate-200 dark:border-slate-700',
    dotClass: 'bg-slate-400',
  },
  'In Progress': {
    label: 'In Progress',
    icon: Loader2,
    bgClass: 'bg-blue-50 dark:bg-blue-950/40',
    textClass: 'text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-200 dark:border-blue-800/70',
    dotClass: 'bg-blue-500',
  },
  Delayed: {
    label: 'Delayed',
    icon: AlertCircle,
    bgClass: 'bg-rose-50 dark:bg-rose-950/40',
    textClass: 'text-rose-700 dark:text-rose-300',
    borderClass: 'border-rose-200 dark:border-rose-800/70',
    dotClass: 'bg-rose-500',
  },
  Completed: {
    label: 'Completed',
    icon: CheckCircle2,
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    borderClass: 'border-emerald-200 dark:border-emerald-800/70',
    dotClass: 'bg-emerald-500',
  },
};

export function StatusBadge({
  status,
  className,
  size = 'default',
  showIcon = true,
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-full select-none transition-colors',
        config.bgClass,
        config.textClass,
        config.borderClass,
        size === 'sm'
          ? 'px-2 py-0.5 text-xs gap-1'
          : 'px-2.5 py-1 text-xs gap-1.5',
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            'shrink-0',
            size === 'sm' ? 'size-3' : 'size-3.5',
            status === 'In Progress' && 'animate-spin'
          )}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}
