'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface DotMatrixProps {
  columns?: number[];
  maxDots?: number;
  highlightIndex?: number | number[];
  variant?: 'dots' | 'wave' | 'block';
  className?: string;
}

export function DotMatrix({
  columns = [2, 3, 4, 6, 9, 7, 5, 4, 6, 8, 11, 7, 5],
  maxDots = 10,
  highlightIndex = 4,
  variant = 'dots',
  className,
}: DotMatrixProps) {
  const highlights = Array.isArray(highlightIndex) ? highlightIndex : [highlightIndex];

  if (variant === 'block') {
    const totalCols = 12;
    const totalRows = 7;
    const highlightStartCol = 6;

    return (
      <div className={cn('flex items-center justify-between gap-1 py-3 select-none', className)}>
        {Array.from({ length: totalCols }).map((_, c) => {
          const isHighlightedCol = c >= highlightStartCol;
          return (
            <div key={c} className="flex flex-col gap-1.5 items-center">
              {Array.from({ length: totalRows }).map((_, r) => {
                const isHighlight = isHighlightedCol && r >= 1;
                return (
                  <span
                    key={r}
                    className={cn(
                      'size-1.5 sm:size-2 rounded-full transition-colors',
                      isHighlight
                        ? 'bg-green-600 dark:bg-green-500 shadow-[0_0_6px_rgba(22,163,74,0.4)]'
                        : 'bg-neutral-200 dark:bg-neutral-800',
                    )}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-end justify-between gap-1 py-3 select-none', className)}>
      {columns.map((val, c) => {
        const isHighlighted = highlights.includes(c);
        const dotsCount = Math.min(maxDots, Math.max(1, Math.round(val)));

        return (
          <div key={c} className="flex flex-col-reverse gap-1.5 items-center flex-1">
            {Array.from({ length: maxDots }).map((_, r) => {
              const active = r < dotsCount;
              if (!active) {
                return (
                  <span
                    key={r}
                    className="size-1.5 sm:size-2 rounded-full opacity-0 pointer-events-none"
                  />
                );
              }
              return (
                <span
                  key={r}
                  className={cn(
                    'size-1.5 sm:size-2 rounded-full transition-all duration-300',
                    isHighlighted
                      ? 'bg-green-600 dark:bg-green-500 shadow-[0_0_6px_rgba(22,163,74,0.5)]'
                      : 'bg-neutral-300/80 dark:bg-neutral-700/80 hover:bg-neutral-400 dark:hover:bg-neutral-600',
                  )}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
