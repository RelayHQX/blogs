'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface BarChartItem {
  label: string;
  sublabel?: string;
  primary: number;
  primaryDisplay: string;
  secondary: number;
  secondaryDisplay: string;
  change?: string;
  higherIsBetter?: boolean;
}

export function SimpleBarChart({
  title,
  subtitle,
  primaryLabel = '@rhq/avatar',
  secondaryLabel = 'Legacy',
  items,
  className,
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  items: BarChartItem[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        'not-prose my-8 border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 p-6 sm:p-7 rounded-2xl shadow-2xs transition-colors',
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h4 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mb-6 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-xs bg-green-600 dark:bg-green-500 shadow-[0_0_6px_rgba(22,163,74,0.4)]" />
          <span className="font-semibold text-neutral-900 dark:text-white">
            {primaryLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-xs bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-neutral-500 dark:text-neutral-400">
            {secondaryLabel}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((row, idx) => {
          const maxVal = Math.max(row.primary, row.secondary);
          let primaryPct = 100;
          let secondaryPct = 100;

          if (row.higherIsBetter !== false) {
            primaryPct = (row.primary / maxVal) * 100;
            secondaryPct = Math.max(4, (row.secondary / maxVal) * 100);
          } else {
            primaryPct = Math.max(4, (row.primary / maxVal) * 100);
            secondaryPct = (row.secondary / maxVal) * 100;
          }

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-baseline justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {row.label}
                  </span>
                  {row.sublabel && (
                    <span className="ml-2 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                      {row.sublabel}
                    </span>
                  )}
                </div>
                {row.change && (
                  <span className="inline-flex items-center rounded-full bg-green-600/10 px-2 py-0.5 font-mono text-[11px] font-bold text-green-600 dark:text-green-400 border border-green-600/20">
                    {row.change}
                  </span>
                )}
              </div>

              {/* Primary Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 font-medium text-neutral-700 dark:text-neutral-300 text-[11px]">
                    {primaryLabel}
                  </span>
                  <div className="flex-1 h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(22,163,74,0.3)]"
                      style={{ width: `${primaryPct}%` }}
                    />
                  </div>
                  <span className="w-28 text-right font-mono font-semibold text-neutral-900 dark:text-white shrink-0 text-[11px]">
                    {row.primaryDisplay}
                  </span>
                </div>

                {/* Secondary Bar */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 text-neutral-400 dark:text-neutral-500 text-[11px]">
                    {secondaryLabel}
                  </span>
                  <div className="flex-1 h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-neutral-300 dark:bg-neutral-700 rounded-full transition-all duration-500"
                      style={{ width: `${secondaryPct}%` }}
                    />
                  </div>
                  <span className="w-28 text-right font-mono text-neutral-400 dark:text-neutral-500 shrink-0 text-[11px]">
                    {row.secondaryDisplay}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
