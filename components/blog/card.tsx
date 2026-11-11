import Link from 'fumadocs-core/link';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import type { BlogPost } from '../../lib/blog';
import { getTagIcon } from '../../lib/tag-icon';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function BlogCards({
  posts,
  className,
  ...props
}: ComponentProps<'div'> & { posts: BlogPost[] }) {
  return (
    <div
      {...props}
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post) => (
        <BlogCard key={post.url} post={post} />
      ))}
    </div>
  );
}

/**
 * Small box card matching X blog reference (media_1794396232779_e2d954f5.jpg):
 * - Top: Category on left, Date on right
 * - Clean cover photo inside card
 * - Headline Title
 * - Clean excerpt description
 * - No extra tag clutter
 */
export function BlogCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  const primaryTag = post.tags[0];
  const TagIcon = getTagIcon(primaryTag?.slug || primaryTag?.name || 'article');
  const dateObj = post.date ? new Date(post.date) : undefined;

  return (
    <Link
      href={post.url}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#121212] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg dark:hover:shadow-neutral-950/60',
        className,
      )}
    >
      {/* Top Header: Category on left, Date on right */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3.5">
        <div className="flex items-center gap-1.5 font-medium">
          <TagIcon className="size-3.5 text-neutral-600 dark:text-neutral-400" />
          <span>{primaryTag?.name || 'Article'}</span>
        </div>
        {dateObj && (
          <time
            dateTime={dateObj.toISOString()}
            className="font-mono text-neutral-400 dark:text-neutral-500 text-[11px]"
          >
            {dateFormat.format(dateObj)}
          </time>
        )}
      </div>

      {/* Cover Photo */}
      {post.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900 mb-4">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={500}
            unoptimized
            className="size-full object-cover transition-transform duration-300 group-hover:scale-103"
          />
        </div>
      )}

      {/* Title */}
      <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white leading-snug group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors line-clamp-2">
        {post.title}
      </h2>

      {/* Description */}
      {post.description && (
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed font-normal">
          {post.description}
        </p>
      )}
    </Link>
  );
}

/** Empty state displayed when no posts match */
export function BlogEmpty({
  title = 'No posts published yet',
  description = 'Check back soon for new updates!',
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 py-16 text-center',
        className,
      )}
    >
      <p className="text-base sm:text-lg font-medium text-neutral-800 dark:text-neutral-200">
        {title}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
