'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { DotMatrix } from './dot-matrix';

export interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  sublabel?: string;
  description?: string;
  tabs?: string[];
  activeTab?: string;
  subStats?: { label: string; value: string; isHighlighted?: boolean }[];
  footer?: string;
  footerLink?: string;
  dots?: number[];
  maxDots?: number;
  highlightIndex?: number | number[];
  variant?: 'dots' | 'wave' | 'block';
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  sublabel,
  description,
  tabs,
  activeTab,
  subStats,
  footer,
  footerLink,
  dots,
  maxDots,
  highlightIndex,
  variant,
  className,
}: MetricCardProps) {
  const [currentTab, setCurrentTab] = React.useState(activeTab || (tabs ? tabs[0] : ''));

  return (
    <div
      className={cn(
        'group flex flex-col justify-between border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 rounded-2xl shadow-2xs transition-all hover:border-neutral-300 dark:hover:border-neutral-700 not-prose',
        className,
      )}
    >
      <div>
        {/* Monospace Micro Header with Optional Tabs or Change Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {label}
          </span>

          {tabs && tabs.length > 0 ? (
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCurrentTab(tab)}
                  className={cn(
                    'px-1.5 py-0.5 rounded transition-colors',
                    currentTab === tab
                      ? 'text-neutral-950 dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800'
                      : 'hover:text-neutral-700 dark:hover:text-neutral-300',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          ) : change ? (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-green-600/10 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold text-green-600 dark:text-green-400 border border-green-600/20">
              <TrendingUp className="size-2.5 shrink-0" />
              {change}
            </span>
          ) : null}
        </div>

        {/* Big Bold Headline Value */}
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          {value}
        </div>

        {/* Sublabel or Context Description */}
        {(sublabel || description) && (
          <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {sublabel || description}
          </p>
        )}
      </div>

      {/* Dot Matrix Visual */}
      <div className="my-4">
        <DotMatrix
          columns={dots}
          maxDots={maxDots}
          highlightIndex={highlightIndex}
          variant={variant}
        />
      </div>

      {/* Sub Stats Row */}
      {subStats && subStats.length > 0 && (
        <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80 pt-3 pb-1">
          {subStats.map((st, i) => (
            <div key={i} className="flex items-baseline gap-1.5 font-mono text-xs">
              <span className="text-neutral-400 dark:text-neutral-500 text-[10px] uppercase">
                {st.label}
              </span>
              <span
                className={cn(
                  'font-bold',
                  st.isHighlighted
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-neutral-800 dark:text-neutral-200',
                )}
              >
                {st.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer Meta */}
      {footer && (
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono font-medium tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
          <span>{footer}</span>
          {footerLink ? (
            <a
              href={footerLink}
              className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 hover:underline"
            >
              <span>See Insights</span>
              <ArrowUpRight className="size-3" />
            </a>
          ) : (
            <ArrowUpRight className="size-3 text-neutral-400 group-hover:text-green-600 transition-colors" />
          )}
        </div>
      )}
    </div>
  );
}

export function MetricGrid({
  items,
  columns = 2,
  className,
}: {
  items: MetricCardProps[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  const colClass =
    columns === 3
      ? 'grid-cols-1 md:grid-cols-3'
      : columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className={cn('my-8 grid gap-4 not-prose', colClass, className)}>
      {items.map((item, idx) => (
        <MetricCard key={idx} {...item} />
      ))}
    </div>
  );
}
