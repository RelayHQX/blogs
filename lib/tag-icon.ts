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
  type LucideIcon,
  GraphStar,
  SquareAsterisk,
  BoxesLinked,
  ShieldCheck,
  Calendars,
} from 'lucide-react';

export type TagIcon = LucideIcon | typeof RelayLogo;

export function getTagIcon(slugOrName: string): TagIcon {
  const key = slugOrName.toLowerCase();
  switch (key) {
    case 'home':
      return Home;
    case 'product':
      return Layers;
    case 'philosophy':
      return GraphStar;
    case 'email':
      return Mail;
    case 'manifesto':
      return SquareAsterisk;
    case 'engineering':
      return Cpu;
    case 'company':
    case 'business':
      return RelayLogo;
    case 'events':
      return Calendars;
    case 'privacy':
    case 'security':
      return ShieldCheck;
    case 'performance':
      return Zap;
    case 'all-tags':
    case 'tags':
      return Tags;
    case 'rss':
      return Rss;
    case 'architecture':
      return BoxesLinked;
    default:
      return Tag;
  }
}
