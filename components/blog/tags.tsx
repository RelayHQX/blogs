import Link from 'fumadocs-core/link';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import type { BlogTag } from '../../lib/blog';
import { getTagIcon } from '@/lib/tag-icon';

export function BlogTags({
  tags,
  className,
  ...props
}: ComponentProps<'div'> & { tags: BlogTag[] }) {
  if (tags.length === 0) return null;

  return (
    <div {...props} className={cn('flex flex-row flex-wrap items-center gap-1.5', className)}>
      {tags.map((tag) => {
        const Icon = getTagIcon(tag.slug);
        return (
          <Link
            key={tag.slug}
            href={tag.url}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <Icon className="size-3 shrink-0" />
            <span>{tag.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function BlogTagCards({
  tags,
  className,
  ...props
}: ComponentProps<'div'> & { tags: (BlogTag & { count: number })[] }) {
  return (
    <div
      {...props}
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4',
        className,
      )}
    >
      {tags.map((tag) => {
        const Icon = getTagIcon(tag.slug);
        return (
          <Link
            key={tag.slug}
            href={tag.url}
            className="group flex flex-row items-center gap-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-3.5 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 shadow-2xs"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
              <Icon className="size-3.5 shrink-0" />
            </div>
            <span className="font-medium text-xs sm:text-sm truncate text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
              {tag.name}
            </span>
            <span className="ms-auto text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full shrink-0">
              {tag.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function BlogTagFilter({
  tags,
  max = 6,
  className,
}: {
  tags: (BlogTag & { count: number })[];
  max?: number;
  className?: string;
}) {
  if (tags.length === 0) return null;

  const displayTags = max ? tags.slice(0, max) : tags;
  const remaining = max && tags.length > max ? tags.length - max : 0;

  return (
    <div className={cn('mt-2 flex flex-wrap items-center gap-2 pt-2', className)}>
      <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Topics:</span>
      {displayTags.map((tag) => {
        const Icon = getTagIcon(tag.slug);
        return (
          <Link
            key={tag.slug}
            href={tag.url}
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <Icon className="size-3 shrink-0" />
            <span>{tag.name}</span>
            <span className="text-neutral-400 dark:text-neutral-500">({tag.count})</span>
          </Link>
        );
      })}
      {remaining > 0 && (
        <Link
          href="/blog/tags"
          className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:underline transition-colors"
        >
          + {remaining} more
        </Link>
      )}
    </div>
  );
}
