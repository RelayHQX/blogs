import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

function estimateTextWidth(text: string, fontSize = 720): number {
  let width = 0;
  for (const ch of text) {
    if ('ijl|\':;!.,'.includes(ch)) {
      width += fontSize * 0.32;
    } else if ('mwMW'.includes(ch)) {
      width += fontSize * 1.05;
    } else if (ch === ' ') {
      width += fontSize * 0.40;
    } else if (ch >= 'A' && ch <= 'Z') {
      width += fontSize * 0.85;
    } else {
      width += fontSize * 0.60;
    }
  }
  return Math.ceil(width);
}

export interface RelayLogoProps extends ComponentProps<'svg'> {
  text?: string;
  textGap?: number;
  textFontSize?: number;
  textFontWeight?: number | string;
  fill?: string;
}

export function RelayLogo({
  text,
  textGap,
  textFontSize = 720,
  textFontWeight = 700,
  fill = 'currentColor',
  className,
  style,
  ...props
}: RelayLogoProps) {
  const logoWidth = 1000;
  const logoHeight = 971;

  const effectiveGap =
    textGap !== undefined ? textGap : text && /^[a-z]/.test(text) ? -80 : 20;
  const textX = logoWidth + effectiveGap;

  const textWidth = text ? estimateTextWidth(text, textFontSize) : 0;
  const totalWidth = text ? Math.ceil(textX + textWidth + 280) : logoWidth;

  const resolvedFill = fill || 'currentColor';

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${logoHeight}`}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', ...style }}
      className={cn('inline-block h-4.5 w-auto shrink-0', className)}
      {...props}
    >
      <path
        d="M 273.41 240.96 C 239.58 238.03 212.37 222.66 189.53 197.92 C 170.94 177.79 151.02 158.89 132.18 138.98 C 97.90 102.76 64.08 66.10 29.85 29.83 C 21.78 21.28 12.82 13.58 0.00 1.44 C 16.94 1.44 28.29 1.46 39.65 1.44 C 120.97 1.35 202.29 1.18 283.61 1.18 C 424.62 1.17 565.65 0.00 706.63 1.96 C 762.36 2.73 808.98 30.18 844.03 72.45 C 885.75 122.76 924.17 175.84 963.57 228.06 C 1000.00 276.34 999.63 344.62 954.32 394.38 C 916.56 435.84 881.74 479.97 845.27 522.62 C 820.64 551.42 788.79 563.57 751.08 563.59 C 621.91 563.68 492.74 564.32 363.57 565.24 C 357.46 565.29 349.46 568.49 345.59 573.01 C 285.08 643.61 224.80 714.42 165.11 785.72 C 116.73 843.52 69.23 902.06 21.18 960.14 C 18.54 963.34 14.45 965.35 7.46 970.59 C 7.46 960.65 7.45 954.49 7.46 948.32 C 7.59 851.33 6.69 754.32 8.64 657.37 C 9.09 635.11 14.66 610.18 26.04 591.44 C 58.83 537.46 96.71 486.60 130.71 433.31 C 145.30 410.45 159.85 387.98 185.04 377.21 C 202.37 369.81 221.85 365.11 240.65 364.00 C 274.92 361.98 309.39 363.57 343.78 363.57 C 441.16 363.55 538.55 363.69 635.92 363.05 C 643.02 363.00 651.80 358.84 656.87 353.70 C 691.45 318.69 725.24 282.91 760.15 244.86 C 757.87 241.81 754.72 240.81 751.57 240.81 C 592.18 240.80 432.79 240.88 273.41 240.96 z M 639.80 616.00 C 664.59 621.66 681.01 635.84 696.88 653.31 C 745.78 707.11 796.65 759.09 846.29 812.22 C 886.79 855.57 926.62 899.56 970.25 947.08 C 957.91 949.08 949.58 951.59 941.24 951.62 C 852.68 951.89 764.11 952.84 675.58 951.24 C 638.62 950.56 607.64 934.60 582.98 904.72 C 548.97 863.53 512.28 824.53 476.56 784.76 C 438.41 742.29 399.88 700.15 361.90 657.53 C 352.31 646.76 344.18 634.69 332.32 619.25 C 338.95 618.18 345.85 616.60 352.84 616.06 C 359.96 615.52 367.15 616.02 374.32 616.02 C 462.22 616.03 550.13 616.03 639.80 616.00 z M 274.63 242.18 C 432.79 240.88 592.18 240.80 751.57 240.81 C 754.72 240.81 757.87 241.81 760.32 243.50 C 602.22 244.63 444.80 244.61 287.39 244.53 C 283.54 244.52 279.69 243.80 274.63 242.18 z"
        fill={resolvedFill}
      />
      {text && (
        <text
          x={textX}
          y="520"
          dominantBaseline="central"
          fill={resolvedFill}
          style={{
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: textFontWeight,
            fontSize: `${textFontSize}px`,
            letterSpacing: '-0.025em',
            fill: resolvedFill,
          }}
        >
          {text}
        </text>
      )}
    </svg>
  );
}
