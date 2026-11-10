import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
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
} from 'lucide-react';

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
};

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...icons,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
