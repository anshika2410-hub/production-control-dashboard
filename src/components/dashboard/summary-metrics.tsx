import React from 'react';
import { SummaryMetrics as SummaryMetricsType } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import {
  Layers,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
} from 'lucide-react';

interface SummaryMetricsProps {
  metrics: SummaryMetricsType;
  onFilterByStatus?: (status: string) => void;
}

export function SummaryMetrics({ metrics }: SummaryMetricsProps) {
  const cards = [
    {
      id: 'total',
      label: 'Total Work Orders',
      value: metrics.totalJobs,
      subtext: 'Active catalog in floor',
      icon: Layers,
      iconContainerClass: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
      borderAccent: 'border-zinc-200 dark:border-zinc-800',
      valueClass: 'text-zinc-900 dark:text-zinc-50',
    },
    {
      id: 'delayed',
      label: 'Delayed Jobs',
      value: metrics.delayedJobs,
      subtext: metrics.delayedJobs > 0 ? 'Requires immediate supervisor review' : 'No operational blockers',
      icon: AlertTriangle,
      iconContainerClass: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
      borderAccent: metrics.delayedJobs > 0 ? 'border-rose-200 dark:border-rose-900/60' : 'border-zinc-200 dark:border-zinc-800',
      valueClass: metrics.delayedJobs > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-900 dark:text-zinc-50',
    },
    {
      id: 'dueSoon',
      label: 'Due Today / Soon',
      value: metrics.dueSoonJobs,
      subtext: 'Within 3 days delivery window',
      icon: CalendarClock,
      iconContainerClass: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
      borderAccent: 'border-amber-200/80 dark:border-amber-900/50',
      valueClass: 'text-amber-700 dark:text-amber-400',
    },
    {
      id: 'completed',
      label: 'Completed Jobs',
      value: metrics.completedJobs,
      subtext: 'Passed QA & ready/dispatched',
      icon: CheckCircle2,
      iconContainerClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
      borderAccent: 'border-emerald-200/80 dark:border-emerald-900/50',
      valueClass: 'text-emerald-700 dark:text-emerald-400',
    },
  ];

  return (
    <section aria-label="Production Summary Metrics">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className={`transition-all bg-card hover:shadow-xs border ${card.borderAccent}`}
            >
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {card.label}
                  </span>
                  <div
                    className={`flex size-8 items-center justify-center rounded-md ${card.iconContainerClass}`}
                    aria-hidden="true"
                  >
                    <Icon className="size-4.5" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-2xl font-bold tracking-tight font-mono ${card.valueClass}`}>
                    {card.value}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground truncate">
                  {card.subtext}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
