'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/cn';
import { ChevronDown } from 'lucide-react';

export interface LineChartProps {
  title?: string;
  subtitle?: string;
  period?: string;
  labels: string[];
  data: number[];
  comparisonData?: number[];
  primaryLabel?: string;
  secondaryLabel?: string;
  yUnit?: string;
  yMin?: number;
  yMax?: number;
  className?: string;
}

export function SimpleLineChart({
  title = 'Sales Overview',
  subtitle,
  period,
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  data = [1900, 1800, 2200, 2400, 1900, 2300, 2600, 2700, 3600, 3400, 3800, 4400],
  comparisonData,
  primaryLabel = '@rhq/avatar',
  secondaryLabel = 'Legacy Engine',
  yUnit = '',
  yMin,
  yMax,
  className,
}: LineChartProps) {
  const gradientId = useId().replace(/:/g, '_');

  const width = 640;
  const height = 260;
  const padL = 46;
  const padR = 24;
  const padT = 24;
  const padB = 34;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  // Auto-scale
  const allValues = [...data, ...(comparisonData || [])];
  const computedMin = yMin !== undefined ? yMin : Math.min(...allValues) * 0.85;
  const computedMax = yMax !== undefined ? yMax : Math.max(...allValues) * 1.1;
  const range = computedMax - computedMin || 1;

  // Calculate coordinates
  const points = data.map((val, idx) => {
    const x = padL + (idx / Math.max(1, data.length - 1)) * chartW;
    const y = padT + chartH - ((val - computedMin) / range) * chartH;
    return { x, y, val };
  });

  // Smooth bezier curve path builder
  function buildSmoothPath(pts: { x: number; y: number }[]) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  const linePath = buildSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;

  // Comparison path if provided
  let compLinePath = '';
  if (comparisonData && comparisonData.length > 0) {
    const compPoints = comparisonData.map((val, idx) => {
      const x = padL + (idx / Math.max(1, comparisonData.length - 1)) * chartW;
      const y = padT + chartH - ((val - computedMin) / range) * chartH;
      return { x, y };
    });
    compLinePath = buildSmoothPath(compPoints);
  }

  // 5 grid lines
  const gridSteps = 4;
  const gridLines = Array.from({ length: gridSteps + 1 }).map((_, i) => {
    const ratio = i / gridSteps;
    const y = padT + chartH - ratio * chartH;
    const val = computedMin + ratio * range;
    return { y, val };
  });

  return (
    <div
      className={cn(
        'not-prose my-8 overflow-hidden border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 p-6 sm:p-7 rounded-2xl shadow-2xs backdrop-blur-xs transition-colors',
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
            {title}
          </h4>
          {subtitle && (
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {period && (
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-2xs">
              <span>{period}</span>
              <ChevronDown className="size-3 text-neutral-400" />
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-green-600" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {primaryLabel}
              </span>
            </div>
            {compLinePath && (
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                <span className="text-neutral-500 dark:text-neutral-400">
                  {secondaryLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SVG Chart Canvas */}
      <div className="w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto block select-none"
        >
          <defs>
            <linearGradient id={`grad_${gradientId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#16a34a" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y labels */}
          {gridLines.map((line, idx) => (
            <g key={idx}>
              <line
                x1={padL}
                y1={line.y}
                x2={width - padR}
                y2={line.y}
                stroke="currentColor"
                className="text-neutral-200/70 dark:text-neutral-800/80"
                strokeDasharray="2 3"
                strokeWidth="1"
              />
              <text
                x={padL - 10}
                y={line.y + 3.5}
                textAnchor="end"
                className="fill-neutral-400 dark:fill-neutral-500 text-[10px] font-mono"
              >
                {Math.round(line.val)}
                {yUnit}
              </text>
            </g>
          ))}

          {/* Comparison line if present */}
          {compLinePath && (
            <path
              d={compLinePath}
              fill="none"
              stroke="currentColor"
              className="text-neutral-400 dark:text-neutral-600"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          )}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#grad_${gradientId})`} />

          {/* Primary line */}
          <path
            d={linePath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill="#ffffff"
              stroke="#16a34a"
              strokeWidth="2.5"
              className="transition-transform hover:scale-150 cursor-pointer"
            >
              <title>{`${labels[idx] || idx}: ${pt.val}${yUnit}`}</title>
            </circle>
          ))}

          {/* X axis labels */}
          {labels.map((lbl, idx) => {
            const x = padL + (idx / Math.max(1, labels.length - 1)) * chartW;
            return (
              <text
                key={idx}
                x={x}
                y={height - 8}
                textAnchor="middle"
                className="fill-neutral-400 dark:fill-neutral-500 text-[11px] font-mono"
              >
                {lbl}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
