import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { RelayLogo } from '@/components/ui/relay-logo';
import {
  Home,
  Layers,
  Mail,
  Cpu,
  Zap,
  Tag,
  Tags,
  Rss,
  GraphStar,
  SquareAsterisk,
  BoxesLinked,
  ShieldCheck,
  Calendars,
} from 'lucide-react';

export type TagIcon = LucideIcon | typeof RelayLogo | ComponentType<{ className?: string }>;

const TAG_ICON_ENTRIES: [string[], TagIcon][] = [
  [['home'], Home],
  [['product'], Layers],
  [['philosophy'], GraphStar],
  [['email'], Mail],
  [['manifesto'], SquareAsterisk],
  [['engineering'], Cpu],
  [['company', 'business'], RelayLogo],
  [['events'], Calendars],
  [['privacy', 'security'], ShieldCheck],
  [['performance'], Zap],
  [['all-tags', 'tags'], Tags],
  [['rss'], Rss],
  [['architecture'], BoxesLinked],
];

const TAG_ICON_MAP = new Map<string, TagIcon>(
  TAG_ICON_ENTRIES.flatMap(([keys, icon]) => keys.map((key) => [key, icon]))
);

export function getTagIcon(slugOrName: string): TagIcon {
  return TAG_ICON_MAP.get(slugOrName.toLowerCase()) ?? Tag;
}
