'use client';

import Link from 'fumadocs-core/link';
import { usePathname } from 'next/navigation';
import { RelayLogo } from '@/components/ui/relay-logo';
import { Home, Tags, Rss, Newspaper } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchButton } from '@/components/search-button';
import { cn } from '@/lib/cn';
import type { BlogTag } from '@/lib/blog';
import { DEFAULT_TAG_NAMES } from '@/lib/blog';
import { getTagIcon } from '@/lib/tag-icon';

export { getTagIcon, DEFAULT_TAG_NAMES };

interface LeftSidebarProps {
  tags?: BlogTag[];
  onItemClick?: () => void;
  className?: string;
  compact?: boolean;
}

export function LeftSidebar({
  tags = [],
  onItemClick,
  className,
  compact = false,
}: LeftSidebarProps) {
  const pathname = usePathname();

  const presentTagNames = new Set(tags.map((t) => t.name.toLowerCase()));
  const allNavTags = [
    ...tags.map((t) => ({ name: t.name, slug: t.slug, url: t.url })),
    ...DEFAULT_TAG_NAMES
      .filter((dt) => !presentTagNames.has(dt.toLowerCase()))
      .map((dt) => ({
        name: dt,
        slug: dt.toLowerCase(),
        url: `/blog/tags/${dt.toLowerCase()}`,
      })),
  ];

  const isHomeActive = pathname === '/' || pathname === '/blog';

  return (
    <div className={cn('flex h-full flex-col justify-between', className)}>
      <div className="flex flex-col gap-6">
        {!compact && (
          <Link
            href="/blog"
            onClick={onItemClick}
            className="group flex items-center gap-2.5 px-3 py-2 text-neutral-900 dark:text-neutral-100 transition-opacity hover:opacity-90"
          >
            <RelayLogo className="w-auto h-[16.6px] text-neutral-900 dark:text-white transition-transform duration-200 group-hover:scale-105" />
            <span className="text-neutral-300 dark:text-neutral-700 font-light select-none text-base">
              |
            </span>
            <Newspaper className="size-4.5 text-neutral-800 dark:text-neutral-200" />
            <span className="font-semibold text-base tracking-tight">Blog</span>
          </Link>
        )}

        <nav className="flex flex-col gap-1">
          <Link
            href="/blog"
            onClick={onItemClick}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              isHomeActive
                ? 'bg-neutral-100 dark:bg-neutral-900 font-semibold text-neutral-950 dark:text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-950 dark:hover:text-white',
            )}
          >
            <Home className="size-4 shrink-0" />
            <span>Home</span>
          </Link>

          {allNavTags.map((tag) => {
            const Icon = getTagIcon(tag.slug);
            const isActive =
              pathname === tag.url || pathname.startsWith(`/blog/tags/${tag.slug}`);

            return (
              <Link
                key={tag.slug}
                href={tag.url}
                onClick={onItemClick}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-neutral-100 dark:bg-neutral-900 font-semibold text-neutral-950 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-950 dark:hover:text-white',
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{tag.name}</span>
              </Link>
            );
          })}

          <Link
            href="/blog/tags"
            onClick={onItemClick}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              pathname === '/blog/tags'
                ? 'bg-neutral-100 dark:bg-neutral-900 font-semibold text-neutral-950 dark:text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-950 dark:hover:text-white',
            )}
          >
            <Tags className="size-4 shrink-0" />
            <span>All Tags</span>
          </Link>

          <Link
            href="/rss.xml"
            onClick={onItemClick}
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <Rss className="size-4 shrink-0 text-orange-500" />
            <span>RSS Feed</span>
          </Link>
        </nav>
      </div>

      {!compact && (
        <div className="pt-6 flex items-center justify-between gap-2 px-1">
          <SearchButton />
          <ThemeToggle />
        </div>
      )}
    </div>
  );
}
