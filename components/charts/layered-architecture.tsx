'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface CacheLayer {
  name: string;
  badge: string;
  stat: string;
  desc?: string;
}

export function LayeredArchitecture({
  layers = [
    {
      name: 'L1 In-Memory LRU',
      badge: 'Dual-TTL',
      stat: '66 ns lookup • 15M ops/s',
    },
    {
      name: 'L2 Storage Cache',
      badge: 'Persistence',
      stat: '2.68 ms • 1,000 items',
    },
    {
      name: 'Range 0-0 Prober',
      badge: '256 Bytes',
      stat: '98.6% bandwidth saved',
    },
  ],
  className,
}: {
  layers?: CacheLayer[];
  className?: string;
}) {
  return (
    <div className={cn('not-prose my-8 w-full select-none', className)}>
      <div className="w-full">
        <svg
          viewBox="0 0 840 350"
          className="w-full h-auto block select-none"
        >
          {/* Layer 1 (Top Slab) */}
          <g transform="translate(140, 50)">
            <polygon
              points="100,0 200,50 100,100 0,50"
              className="fill-green-600/20 stroke-green-500/60"
              strokeWidth="1.8"
            />
            <polygon
              points="0,50 100,100 100,120 0,70"
              className="fill-green-700/30 stroke-green-500/60"
              strokeWidth="1.8"
            />
            <polygon
              points="100,100 200,50 200,70 100,120"
              className="fill-green-800/40 stroke-green-500/60"
              strokeWidth="1.8"
            />
            {/* Number on slab */}
            <text
              x="100"
              y="60"
              textAnchor="middle"
              className="fill-green-600 dark:fill-green-400 font-mono text-xl font-extrabold"
            >
              L1
            </text>
          </g>

          {/* Connector to Layer 1 Callout */}
          <path
            d="M 340 100 L 415 100"
            fill="none"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx="415" cy="100" r="3.5" fill="#16a34a" />

          {/* Layer 1 Callout Card - dark mode white/10 glass tile */}
          <g transform="translate(430, 72)">
            <rect
              width="310"
              height="56"
              rx="12"
              className="fill-neutral-100 dark:fill-white/10 stroke-neutral-200 dark:stroke-white/15"
              strokeWidth="1.2"
            />
            <text x="16" y="24" className="fill-neutral-900 dark:fill-white text-xs font-bold">
              {layers[0]?.name || 'L1 In-Memory LRU'}
            </text>
            <rect
              x="220"
              y="11"
              width="76"
              height="18"
              rx="5"
              className="fill-green-600/10 stroke-green-600/25"
            />
            <text
              x="258"
              y="23"
              textAnchor="middle"
              className="fill-green-600 dark:fill-green-400 font-mono text-[10px] font-bold"
            >
              {layers[0]?.badge || 'Dual-TTL'}
            </text>
            <text
              x="16"
              y="44"
              className="fill-neutral-600 dark:fill-neutral-300 font-mono text-[11px]"
            >
              {layers[0]?.stat}
            </text>
          </g>

          {/* Layer 2 (Middle Slab) */}
          <g transform="translate(140, 130)">
            <polygon
              points="100,0 200,50 100,100 0,50"
              className="fill-neutral-100 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.8"
            />
            <polygon
              points="0,50 100,100 100,120 0,70"
              className="fill-neutral-200 dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.8"
            />
            <polygon
              points="100,100 200,50 200,70 100,120"
              className="fill-neutral-300 dark:fill-neutral-950 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.8"
            />
            <text
              x="100"
              y="60"
              textAnchor="middle"
              className="fill-neutral-600 dark:fill-neutral-400 font-mono text-xl font-extrabold"
            >
              L2
            </text>
          </g>

          {/* Connector to Layer 2 Callout */}
          <path
            d="M 340 180 L 415 180"
            fill="none"
            stroke="currentColor"
            className="text-neutral-400 dark:text-neutral-600"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx="415" cy="180" r="3.5" fill="#16a34a" />

          {/* Layer 2 Callout Card - dark mode white/10 glass tile */}
          <g transform="translate(430, 152)">
            <rect
              width="310"
              height="56"
              rx="12"
              className="fill-neutral-100 dark:fill-white/10 stroke-neutral-200 dark:stroke-white/15"
              strokeWidth="1.2"
            />
            <text x="16" y="24" className="fill-neutral-900 dark:fill-white text-xs font-bold">
              {layers[1]?.name || 'L2 Storage Cache'}
            </text>
            <rect
              x="210"
              y="11"
              width="86"
              height="18"
              rx="5"
              className="fill-neutral-200/80 dark:fill-white/10 stroke-neutral-300 dark:stroke-white/10"
            />
            <text
              x="253"
              y="23"
              textAnchor="middle"
              className="fill-neutral-600 dark:fill-neutral-300 font-mono text-[10px] font-bold"
            >
              {layers[1]?.badge || 'Persistence'}
            </text>
            <text
              x="16"
              y="44"
              className="fill-neutral-600 dark:fill-neutral-300 font-mono text-[11px]"
            >
              {layers[1]?.stat}
            </text>
          </g>

          {/* Layer 3 (Bottom Slab) */}
          <g transform="translate(140, 210)">
            <polygon
              points="100,0 200,50 100,100 0,50"
              className="fill-neutral-100 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.8"
            />
            <polygon
              points="0,50 100,100 100,120 0,70"
              className="fill-neutral-200 dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.8"
            />
            <polygon
              points="100,100 200,50 200,70 100,120"
              className="fill-neutral-300 dark:fill-neutral-950 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.8"
            />
            <text
              x="100"
              y="60"
              textAnchor="middle"
              className="fill-neutral-600 dark:fill-neutral-400 font-mono text-xl font-extrabold"
            >
              L3
            </text>
          </g>

          {/* Connector to Layer 3 Callout */}
          <path
            d="M 340 260 L 415 260"
            fill="none"
            stroke="currentColor"
            className="text-neutral-400 dark:text-neutral-600"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx="415" cy="260" r="3.5" fill="#16a34a" />

          {/* Layer 3 Callout Card - dark mode white/10 glass tile */}
          <g transform="translate(430, 232)">
            <rect
              width="310"
              height="56"
              rx="12"
              className="fill-neutral-100 dark:fill-white/10 stroke-neutral-200 dark:stroke-white/15"
              strokeWidth="1.2"
            />
            <text x="16" y="24" className="fill-neutral-900 dark:fill-white text-xs font-bold">
              {layers[2]?.name || 'Range 0-0 Prober'}
            </text>
            <rect
              x="220"
              y="11"
              width="76"
              height="18"
              rx="5"
              className="fill-green-600/10 stroke-green-600/25"
            />
            <text
              x="258"
              y="23"
              textAnchor="middle"
              className="fill-green-600 dark:fill-green-400 font-mono text-[10px] font-bold"
            >
              {layers[2]?.badge || 'Network'}
            </text>
            <text
              x="16"
              y="44"
              className="fill-neutral-600 dark:fill-neutral-300 font-mono text-[11px]"
            >
              {layers[2]?.stat}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
