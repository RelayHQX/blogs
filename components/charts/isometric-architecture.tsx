'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface CalloutLine {
  key: string;
  value: string;
}

export interface IsometricArchitectureProps {
  clientLabel?: string;
  clientSublabel?: string;
  relayLabel?: string;
  relaySublabel?: string;
  relayBadge?: string;
  serverLabel?: string;
  serverSublabel?: string;
  leftCardTitle?: string;
  leftCardLines?: CalloutLine[] | string[];
  rightCardTitle?: string;
  rightCardLines?: CalloutLine[] | string[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function IsometricArchitecture({
  clientLabel = 'Client',
  clientSublabel = '(Inbox App)',
  relayLabel = 'Relay',
  relaySublabel = '@rhq/avatar Engine',
  relayBadge = '15M+ ops/s',
  serverLabel = 'Avatar CDN',
  serverSublabel = '(Gravatar / Domain)',
  leftCardTitle = 'POST /avatar/resolve',
  leftCardLines = [
    { key: 'email', value: '"karri@linear.app"' },
    { key: 'policy', value: '"first-match"' },
    { key: 'cache', value: '"dual-ttl-l1"' },
  ],
  rightCardTitle = 'HTTP 206 Partial Content',
  rightCardLines = [
    { key: 'range', value: '"bytes=0-0"' },
    { key: 'payload', value: '"256 bytes (-98.6%)"' },
    { key: 'stream', value: '"response.body.cancel()"' },
  ],
  className,
}: IsometricArchitectureProps) {
  // Normalize card lines to key-value objects
  const parsedLeftLines: CalloutLine[] = leftCardLines.map((line) => {
    if (typeof line === 'string') {
      const parts = line.split(':');
      return {
        key: parts[0]?.trim().replace(/^["']|["']$/g, '') || '',
        value: parts.slice(1).join(':').trim() || '',
      };
    }
    return line;
  });

  const parsedRightLines: CalloutLine[] = rightCardLines.map((line) => {
    if (typeof line === 'string') {
      const parts = line.split(':');
      return {
        key: parts[0]?.trim().replace(/^["']|["']$/g, '') || '',
        value: parts.slice(1).join(':').trim() || '',
      };
    }
    return line;
  });

  return (
    <div className={cn('not-prose my-8 w-full select-none', className)}>
      {/* Isometric SVG Canvas - Responsive 100% vector scaling, zero scrollbar */}
      <div className="w-full">
        <svg
          viewBox="0 0 1020 430"
          className="w-full h-auto block select-none"
        >
          <defs>
            {/* Green glow filter */}
            <filter id="green-glow-iso" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Subtle drop shadow filter for floating cards */}
            <filter id="card-shadow-iso" x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* =============================================================
              1. Connecting Lines & Beams
              ============================================================= */}
          {/* Card 1 to Client line */}
          <path
            d="M 267 145 L 285 145 L 285 220"
            fill="none"
            stroke="currentColor"
            className="text-neutral-300 dark:text-white/20"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          <circle cx="285" cy="220" r="4" fill="#16a34a" />

          {/* Client to Relay Connecting Line (neutral / white-10 dotted line, no arrow) */}
          <path
            d="M 317 248 L 441 180"
            fill="none"
            stroke="currentColor"
            className="text-neutral-300 dark:text-white/20"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />

          {/* Relay to CDN Connecting Line (green dotted line, no arrow) */}
          <path
            d="M 539 180 L 678 118"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.2"
            strokeDasharray="4 4"
          />

          {/* Server to Card 2 line */}
          <path
            d="M 740 135 L 795 135 L 795 205"
            fill="none"
            stroke="currentColor"
            className="text-neutral-300 dark:text-white/20"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          <circle cx="795" cy="205" r="4" fill="#16a34a" />

          {/* =============================================================
              2. Left Floating Card: POST /avatar/resolve
              Enlarged, crisp typography (13px), dark mode white/10
              ============================================================= */}
          <g transform="translate(12, 32)" filter="url(#card-shadow-iso)">
            <rect
              width="255"
              height="190"
              rx="14"
              className="fill-neutral-50 dark:fill-white/10 stroke-neutral-200 dark:stroke-white/15"
              strokeWidth="1.2"
            />
            {/* Header bar */}
            <rect
              width="255"
              height="40"
              rx="14"
              className="fill-neutral-100/80 dark:fill-white/5"
            />
            <text
              x="18"
              y="25"
              className="fill-neutral-700 dark:fill-neutral-200 text-[13px] font-mono font-bold"
            >
              {leftCardTitle}
            </text>
            <circle cx="235" cy="20" r="4" fill="#16a34a" />

            {/* Code Body */}
            <text x="18" y="64" className="fill-neutral-400 dark:fill-neutral-500 text-[13px] font-mono">
              &#123;
            </text>
            {parsedLeftLines.map((item, idx) => (
              <text
                key={idx}
                x="30"
                y={88 + idx * 24}
                className="fill-neutral-800 dark:fill-neutral-200 text-[13px] font-mono font-medium"
              >
                <tspan className="fill-green-600 dark:fill-green-400 font-semibold">&quot;{item.key}&quot;</tspan>
                : {item.value}
                {idx < parsedLeftLines.length - 1 ? ',' : ''}
              </text>
            ))}
            <text
              x="18"
              y={88 + parsedLeftLines.length * 24}
              className="fill-neutral-400 dark:fill-neutral-500 text-[13px] font-mono"
            >
              &#125;
            </text>
          </g>

          {/* =============================================================
              3. Cube 1: Client (Inbox List View)
              Center (275, 245), Size s=48, h=48
              ============================================================= */}
          <g>
            {/* Top Labels */}
            <text
              x="275"
              y="160"
              textAnchor="middle"
              className="fill-neutral-800 dark:fill-neutral-200 text-sm font-bold"
            >
              {clientLabel}
            </text>
            <text
              x="275"
              y="176"
              textAnchor="middle"
              className="fill-neutral-400 dark:fill-neutral-500 text-xs font-mono"
            >
              {clientSublabel}
            </text>

            {/* Top Face */}
            <polygon
              points="275,198 317,222 275,246 233,222"
              className="fill-neutral-100 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.4"
            />
            {/* App Icon glyph on Top Face */}
            <g transform="translate(266, 214) scale(0.7)">
              <rect
                width="26"
                height="20"
                rx="4"
                fill="none"
                stroke="currentColor"
                className="text-neutral-500 dark:text-neutral-400"
                strokeWidth="2"
              />
              <line
                x1="8"
                y1="24"
                x2="18"
                y2="24"
                stroke="currentColor"
                className="text-neutral-500 dark:text-neutral-400"
                strokeWidth="2"
              />
            </g>

            {/* Left Face */}
            <polygon
              points="233,222 275,246 275,294 233,270"
              className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.4"
            />
            {/* Right Face */}
            <polygon
              points="275,246 317,222 317,270 275,294"
              className="fill-neutral-200/90 dark:fill-neutral-950 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.4"
            />
            {/* Connection Port Dot on right face */}
            <circle cx="317" cy="248" r="4" fill="#16a34a" />
          </g>

          {/* =============================================================
              4. Cube 2: Relay (@rhq/avatar) - HERO green-600 CUBE
              Center (490, 180), Size s=56, h=56
              GENUINE RELAY LOGO on the top face!
              ============================================================= */}
          <g>
            {/* Top Labels */}
            <text
              x="490"
              y="85"
              textAnchor="middle"
              className="fill-green-600 dark:fill-green-400 text-base font-extrabold tracking-wide"
            >
              {relayLabel}
            </text>
            <text
              x="490"
              y="102"
              textAnchor="middle"
              className="fill-neutral-400 dark:fill-neutral-500 text-xs font-mono font-semibold"
            >
              {relaySublabel}
            </text>

            {/* Top Face (Vibrant green-500 highlight #22c55e) */}
            <polygon
              points="490,124 539,152 490,180 441,152"
              fill="#22c55e"
              stroke="#16a34a"
              strokeWidth="1.8"
            />

            {/* Genuine Relay Logo on Top Face */}
            <g transform="translate(474, 139) scale(0.032, 0.025)">
              <path
                d="M 273.41 240.96 C 239.58 238.03 212.37 222.66 189.53 197.92 C 170.94 177.79 151.02 158.89 132.18 138.98 C 97.90 102.76 64.08 66.10 29.85 29.83 C 21.78 21.28 12.82 13.58 0.00 1.44 C 16.94 1.44 28.29 1.46 39.65 1.44 C 120.97 1.35 202.29 1.18 283.61 1.18 C 424.62 1.17 565.65 0.00 706.63 1.96 C 762.36 2.73 808.98 30.18 844.03 72.45 C 885.75 122.76 924.17 175.84 963.57 228.06 C 1000.00 276.34 999.63 344.62 954.32 394.38 C 916.56 435.84 881.74 479.97 845.27 522.62 C 820.64 551.42 788.79 563.57 751.08 563.59 C 621.91 563.68 492.74 564.32 363.57 565.24 C 357.46 565.29 349.46 568.49 345.59 573.01 C 285.08 643.61 224.80 714.42 165.11 785.72 C 116.73 843.52 69.23 902.06 21.18 960.14 C 18.54 963.34 14.45 965.35 7.46 970.59 C 7.46 960.65 7.45 954.49 7.46 948.32 C 7.59 851.33 6.69 754.32 8.64 657.37 C 9.09 635.11 14.66 610.18 26.04 591.44 C 58.83 537.46 96.71 486.60 130.71 433.31 C 145.30 410.45 159.85 387.98 185.04 377.21 C 202.37 369.81 221.85 365.11 240.65 364.00 C 274.92 361.98 309.39 363.57 343.78 363.57 C 441.16 363.55 538.55 363.69 635.92 363.05 C 643.02 363.00 651.80 358.84 656.87 353.70 C 691.45 318.69 725.24 282.91 760.15 244.86 C 757.87 241.81 754.72 240.81 751.57 240.81 C 592.18 240.80 432.79 240.88 273.41 240.96 z M 639.80 616.00 C 664.59 621.66 681.01 635.84 696.88 653.31 C 745.78 707.11 796.65 759.09 846.29 812.22 C 886.79 855.57 926.62 899.56 970.25 947.08 C 957.91 949.08 949.58 951.59 941.24 951.62 C 852.68 951.89 764.11 952.84 675.58 951.24 C 638.62 950.56 607.64 934.60 582.98 904.72 C 548.97 863.53 512.28 824.53 476.56 784.76 C 438.41 742.29 399.88 700.15 361.90 657.53 C 352.31 646.76 344.18 634.69 332.32 619.25 C 338.95 618.18 345.85 616.60 352.84 616.06 C 359.96 615.52 367.15 616.02 374.32 616.02 C 462.22 616.03 550.13 616.03 639.80 616.00 z"
                fill="#ffffff"
              />
            </g>

            {/* Left Face (Primary green-600 #16a34a) */}
            <polygon
              points="441,152 490,180 490,236 441,208"
              fill="#16a34a"
              stroke="#15803d"
              strokeWidth="1.8"
            />
            {/* Receiver Port Dot on left face */}
            <circle cx="441" cy="180" r="4.5" fill="#ffffff" stroke="#15803d" strokeWidth="2" />

            {/* Right Face (Deep green-700 shadow #15803d) */}
            <polygon
              points="490,180 539,152 539,208 490,236"
              fill="#15803d"
              stroke="#14532d"
              strokeWidth="1.8"
            />
            {/* Transmitter Port Dot on right face */}
            <circle cx="539" cy="180" r="4.5" fill="#ffffff" stroke="#14532d" strokeWidth="2" />

            {/* Active Pill Badge underneath */}
            {relayBadge && (
              <g transform="translate(435, 255)">
                <rect
                  width="110"
                  height="26"
                  rx="8"
                  className="fill-green-600/10 stroke-green-600/30"
                  strokeWidth="1.2"
                />
                <text
                  x="55"
                  y="17"
                  textAnchor="middle"
                  className="fill-green-600 dark:fill-green-400 text-xs font-mono font-bold"
                >
                  {relayBadge}
                </text>
              </g>
            )}
          </g>

          {/* =============================================================
              5. Cube 3: Avatar Provider / CDN (Your Server)
              Center (720, 115), Size s=48, h=48
              Modern Cloud Icon on Top Face!
              ============================================================= */}
          <g>
            {/* Top Labels */}
            <text
              x="720"
              y="32"
              textAnchor="middle"
              className="fill-neutral-800 dark:fill-neutral-200 text-sm font-bold"
            >
              {serverLabel}
            </text>
            <text
              x="720"
              y="48"
              textAnchor="middle"
              className="fill-neutral-400 dark:fill-neutral-500 text-xs font-mono"
            >
              {serverSublabel}
            </text>

            {/* Top Face */}
            <polygon
              points="720,70 762,94 720,118 678,94"
              className="fill-neutral-100 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.4"
            />
            {/* Crisp Cloud Icon on Top Face */}
            <g transform="translate(708, 83) scale(1.0)">
              <path
                d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                fill="none"
                stroke="currentColor"
                className="text-neutral-500 dark:text-neutral-400"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Left Face */}
            <polygon
              points="678,94 720,118 720,166 678,142"
              className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.4"
            />
            <circle cx="678" cy="118" r="4" fill="#16a34a" />

            {/* Right Face */}
            <polygon
              points="720,118 762,94 762,142 720,166"
              className="fill-neutral-200/90 dark:fill-neutral-950 stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="1.4"
            />
          </g>

          {/* =============================================================
              6. Right Floating Card: HTTP 206 Partial Content
              Enlarged, crisp typography (13px), dark mode white/10
              ============================================================= */}
          <g transform="translate(685, 205)" filter="url(#card-shadow-iso)">
            <rect
              width="310"
              height="190"
              rx="14"
              className="fill-neutral-50 dark:fill-white/10 stroke-green-600/30 dark:stroke-green-500/30"
              strokeWidth="1.2"
            />
            {/* Header bar */}
            <rect
              width="310"
              height="40"
              rx="14"
              className="fill-green-600/10 dark:fill-green-500/10"
            />
            <text
              x="18"
              y="25"
              className="fill-green-700 dark:fill-green-400 text-[13px] font-mono font-bold"
            >
              {rightCardTitle}
            </text>
            <circle cx="290" cy="20" r="4" fill="#16a34a" />

            {/* Code Body */}
            <text x="18" y="64" className="fill-neutral-400 dark:fill-neutral-500 text-[13px] font-mono">
              &#123;
            </text>
            {parsedRightLines.map((item, idx) => (
              <text
                key={idx}
                x="30"
                y={88 + idx * 24}
                className="fill-neutral-800 dark:fill-neutral-200 text-[13px] font-mono font-medium"
              >
                <tspan className="fill-green-600 dark:fill-green-400 font-semibold">&quot;{item.key}&quot;</tspan>
                : {item.value}
                {idx < parsedRightLines.length - 1 ? ',' : ''}
              </text>
            ))}
            <text
              x="18"
              y={88 + parsedRightLines.length * 24}
              className="fill-neutral-400 dark:fill-neutral-500 text-[13px] font-mono"
            >
              &#125;
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
