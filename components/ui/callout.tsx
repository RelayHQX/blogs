'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Info, AlertTriangle, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export type CalloutType =
  | 'info'
  | 'warn'
  | 'warning'
  | 'error'
  | 'success'
  | 'idea'
  | 'note'
  | 'tip'
  | 'caution'
  | 'important';

const typeConfig: Record<
  string,
  {
    icon: typeof Info;
    accentBar: string;
    iconColor: string;
    border: string;
    cardBg: string;
  }
> = {
  info: {
    icon: Info,
    accentBar: 'bg-blue-500',
    iconColor: 'text-blue-500 dark:text-blue-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#121417]/80',
  },
  note: {
    icon: Info,
    accentBar: 'bg-blue-500',
    iconColor: 'text-blue-500 dark:text-blue-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#121417]/80',
  },
  tip: {
    icon: Lightbulb,
    accentBar: 'bg-emerald-500',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#101714]/80',
  },
  idea: {
    icon: Lightbulb,
    accentBar: 'bg-emerald-500',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#101714]/80',
  },
  important: {
    icon: AlertTriangle,
    accentBar: 'bg-amber-500',
    iconColor: 'text-amber-500 dark:text-amber-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#1a160d]/80',
  },
  warn: {
    icon: AlertTriangle,
    accentBar: 'bg-amber-500',
    iconColor: 'text-amber-500 dark:text-amber-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#1a160d]/80',
  },
  warning: {
    icon: AlertTriangle,
    accentBar: 'bg-amber-500',
    iconColor: 'text-amber-500 dark:text-amber-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#1a160d]/80',
  },
  error: {
    icon: AlertCircle,
    accentBar: 'bg-rose-500',
    iconColor: 'text-rose-500 dark:text-rose-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#1a0f12]/80',
  },
  caution: {
    icon: AlertCircle,
    accentBar: 'bg-rose-500',
    iconColor: 'text-rose-500 dark:text-rose-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#1a0f12]/80',
  },
  success: {
    icon: CheckCircle2,
    accentBar: 'bg-emerald-500',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    border: 'border-neutral-200 dark:border-neutral-800/80',
    cardBg: 'bg-neutral-50/70 dark:bg-[#101714]/80',
  },
};

export interface CalloutProps extends Omit<ComponentProps<'div'>, 'title'> {
  type?: CalloutType;
  title?: ReactNode;
  icon?: ReactNode;
}

export function Callout({
  type = 'info',
  title,
  icon: customIcon,
  children,
  className,
  ...props
}: CalloutProps) {
  const config = typeConfig[type.toLowerCase()] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <aside
      className={cn(
        'my-6 flex items-start gap-3 rounded-2xl border p-4 text-sm transition-colors',
        config.border,
        config.cardBg,
        className,
      )}
      {...props}
    >
      <div
        className={cn('w-0.5 self-stretch rounded-full shrink-0', config.accentBar)}
        aria-hidden="true"
      />

      <div className={cn('mt-0.5 shrink-0', config.iconColor)}>
        {customIcon || <IconComponent className="size-4.5" />}
      </div>

      <div className="flex-1 min-w-0 text-neutral-800 dark:text-neutral-300 leading-relaxed font-normal">
        {title && (
          <div className="font-semibold text-neutral-950 dark:text-white mb-1">
            {title}
          </div>
        )}
        <div className="[&>p]:my-0 [&>p:not(:last-child)]:mb-2">{children}</div>
      </div>
    </aside>
  );
}
