import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout, type CalloutType } from '@/components/ui/callout';
import React, { Children, isValidElement, cloneElement, type ReactNode, type ComponentProps } from 'react';
import { cn } from '@/lib/cn';
import {
  Zap,
  ShieldCheck,
  KeyRound,
  CreditCard,
  Package,
  Plane,
  Calendar,
  Lock,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Inbox,
  Layers,
  Cpu,
  EyeOff,
  Gauge,
  Sparkles,
  Check,
  X,
  Clock,
  FileText,
  Mail,
  Sliders,
  Send,
  Workflow,
  Search,
  Bell,
  RefreshCw,
  Terminal,
  Smartphone,
  Server,
  Info,
  Brain,
  Users,
  ScanSearch,
  Filter,
  Truck,
  Receipt,
  CalendarClock,
  Code,
  Globe,
  SlidersHorizontal,
  CalendarDays,
  Wallet,
} from 'lucide-react';

const ALERT_MAP: Record<string, { type: CalloutType; title: string }> = {
  NOTE: { type: 'info', title: 'Note' },
  TIP: { type: 'idea', title: 'Tip' },
  IMPORTANT: { type: 'warn', title: 'Important' },
  WARNING: { type: 'warning', title: 'Warning' },
  CAUTION: { type: 'error', title: 'Caution' },
};

function AlertBlockquote({ children, className, ...props }: ComponentProps<'blockquote'>) {
  const childArray = Children.toArray(children);
  if (childArray.length === 0) {
    return (
      <blockquote
        className={cn(
          'my-6 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1 italic text-neutral-600 dark:text-neutral-400',
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }

  const first = childArray[0];
  let text = '';

  if (typeof first === 'string') {
    text = first;
  } else if (isValidElement(first) && first.props && (first.props as { children?: ReactNode }).children) {
    const pChildren = Children.toArray((first.props as { children?: ReactNode }).children);
    if (typeof pChildren[0] === 'string') {
      text = pChildren[0];
    }
  }

  const match = text.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*[\r\n]+|\s+)?/i);
  if (!match) {
    return (
      <blockquote
        className={cn(
          'my-6 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1 italic text-neutral-600 dark:text-neutral-400',
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }

  const alertKey = match[1].toUpperCase();
  const config = ALERT_MAP[alertKey] || { type: 'info', title: 'Note' };
  const strippedText = text.slice(match[0].length);

  let newChildren: ReactNode[];
  if (typeof first === 'string') {
    newChildren = [strippedText, ...childArray.slice(1)].filter(Boolean);
  } else if (isValidElement(first)) {
    const pChildren = Children.toArray((first.props as { children?: ReactNode }).children);
    const newPChildren = [strippedText, ...pChildren.slice(1)]
      .filter(Boolean)
      .map((child, idx) => (idx === 0 && typeof child === 'string' ? child.trimStart() : child))
      .filter(Boolean);

    if (newPChildren.length === 0) {
      newChildren = childArray.slice(1);
    } else {
      const newFirst = cloneElement(first, {}, ...newPChildren);
      newChildren = [newFirst, ...childArray.slice(1)];
    }
  } else {
    newChildren = childArray.slice(1);
  }

  return (
    <Callout
      type={config.type}
      title={config.title}
      className="my-6 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200"
    >
      {newChildren}
    </Callout>
  );
}

const icons = {
  Zap,
  ShieldCheck,
  KeyRound,
  CreditCard,
  Package,
  Plane,
  Calendar,
  Lock,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Inbox,
  Layers,
  Cpu,
  EyeOff,
  Gauge,
  Sparkles,
  Check,
  X,
  Clock,
  FileText,
  Mail,
  Sliders,
  Send,
  Workflow,
  Search,
  Bell,
  RefreshCw,
  Terminal,
  Smartphone,
  Server,
  Info,
  Brain,
  Users,
  ScanSearch,
  Filter,
  Truck,
  Receipt,
  CalendarClock,
  Code,
  Globe,
  SlidersHorizontal,
  CalendarDays,
  Wallet,
};

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    blockquote: AlertBlockquote,
    Callout,
    ...icons,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
