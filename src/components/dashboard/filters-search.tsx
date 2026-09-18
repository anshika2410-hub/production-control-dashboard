import React from 'react';
import {
  StatusFilterOption,
  SortConfig,
  SortField,
  SortDirection,
} from '@/types/job';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  X,
  ArrowUpDown,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

interface FiltersSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilterOption;
  onStatusFilterChange: (status: StatusFilterOption) => void;
  sortConfig: SortConfig;
  onSortChange: (field: SortField) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
  totalResults: number;
}

const statusOptions: { label: string; value: StatusFilterOption }[] = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Pending', value: 'Pending' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Delayed', value: 'Delayed' },
  { label: 'Completed', value: 'Completed' },
];

export function FiltersSearch({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortConfig,
  onSortChange,
  onSortDirectionChange,
  onResetFilters,
  isFiltered,
  totalResults,
}: FiltersSearchProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3.5 shadow-2xs">
      {/* Top row: Search input and Reset Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1 max-w-lg">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="Search by Job ID, product name, or customer..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8.5 pr-8 h-9 text-sm bg-background"
            aria-label="Search jobs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            {totalResults} {totalResults === 1 ? 'order' : 'orders'} found
          </span>

          {isFiltered && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <RotateCcw className="size-3" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Bottom row: Status Filter Buttons & Sort Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-2 border-t border-border/60">
        {/* Status Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter jobs by status"
        >
          <span className="text-xs font-medium text-muted-foreground mr-1 hidden lg:inline">
            Status:
          </span>
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <Button
                key={opt.value}
                type="button"
                variant={isActive ? 'default' : 'ghost'}
                size="xs"
                onClick={() => onStatusFilterChange(opt.value)}
                className={`text-xs h-7 px-2.5 rounded-md cursor-pointer transition-colors ${
                  isActive
                    ? 'font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                }`}
                aria-pressed={isActive}
              >
                {opt.label}
              </Button>
            );
          })}
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-1.5 self-end md:self-auto w-full md:w-auto justify-end">
          <div className="flex items-center gap-1 bg-muted/40 p-0.5 rounded-lg border border-border/70 text-xs">
            <span className="text-[11px] font-medium text-muted-foreground px-1.5 flex items-center gap-1">
              <SlidersHorizontal className="size-3" />
              Sort:
            </span>

            <Button
              type="button"
              variant={sortConfig.field === 'dueDate' ? 'secondary' : 'ghost'}
              size="xs"
              onClick={() => onSortChange('dueDate')}
              className={`h-6 text-xs px-2 cursor-pointer ${
                sortConfig.field === 'dueDate' ? 'font-semibold shadow-2xs' : 'text-muted-foreground'
              }`}
            >
              Due Date
            </Button>

            <Button
              type="button"
              variant={sortConfig.field === 'quantity' ? 'secondary' : 'ghost'}
              size="xs"
              onClick={() => onSortChange('quantity')}
              className={`h-6 text-xs px-2 cursor-pointer ${
                sortConfig.field === 'quantity' ? 'font-semibold shadow-2xs' : 'text-muted-foreground'
              }`}
            >
              Quantity
            </Button>

            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() =>
                onSortDirectionChange(
                  sortConfig.direction === 'asc' ? 'desc' : 'asc'
                )
              }
              className="h-6 px-1.5 text-xs ml-1 cursor-pointer"
              title={`Sorting ${sortConfig.direction === 'asc' ? 'Ascending (click for Descending)' : 'Descending (click for Ascending)'}`}
              aria-label={`Sort direction: currently ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`}
            >
              <ArrowUpDown className="size-3 mr-1" />
              <span className="uppercase text-[10px] font-mono">
                {sortConfig.direction}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
