import Link from 'fumadocs-core/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { cn } from '@/lib/cn';
import { getTagIcon } from '@/lib/tag-icon';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

interface BlogFeaturedCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogFeaturedCard({ post, className }: BlogFeaturedCardProps) {
  const primaryTag = post.tags[0];
  const TagIcon = getTagIcon(primaryTag?.slug || primaryTag?.name || 'article');
  const dateObj = post.date ? new Date(post.date) : undefined;

  return (
    <Link
      href={post.url}
      className={cn(
        'group relative block overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-neutral-950/80 active:scale-[0.99]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={750}
            unoptimized
            priority
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-neutral-900" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-[11px] sm:text-xs font-medium text-white/80">
              <TagIcon className="size-3.5 shrink-0" />
              <span className="truncate">{primaryTag?.name || 'Featured'}</span>
              {dateObj && (
                <>
                  <span className="text-white/40">·</span>
                  <time dateTime={dateObj.toISOString()}>{dateFormat.format(dateObj)}</time>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug line-clamp-2">
              {post.title}
            </h2>
          </div>

          <span className="hidden sm:inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
