import Link from 'fumadocs-core/link';
import { TagIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import type { BlogTag } from '../../lib/blog';

/** Inline tag pills */
export function BlogTags({
  tags,
  className,
  ...props
}: ComponentProps<'div'> & { tags: BlogTag[] }) {
  if (tags.length === 0) return null;

  return (
    <div {...props} className={cn('flex flex-row flex-wrap items-center gap-1.5', className)}>
      <TagIcon className="size-3 text-neutral-400 dark:text-neutral-500" />
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={tag.url}
          className="rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}

/** Grid of all available tags with count badges */
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
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={tag.url}
          className="group flex flex-row items-center gap-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-3.5 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 shadow-2xs"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            <TagIcon className="size-3.5" />
          </div>
          <span className="font-medium text-xs sm:text-sm truncate text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            {tag.name}
          </span>
          <span className="ms-auto text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full shrink-0">
            {tag.count}
          </span>
        </Link>
      ))}
    </div>
  );
}
