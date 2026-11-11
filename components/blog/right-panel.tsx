'use client';

import { useState } from 'react';
import Link from 'fumadocs-core/link';
import Image from 'next/image';
import { ArrowUpRight, Check, ListFilter } from 'lucide-react';
import type { BlogAuthor, BlogTag } from '@/lib/blog';
import type { TOCItemType } from 'fumadocs-core/toc';
import { useTOCItems } from '@/components/toc';
import { cn } from '@/lib/cn';

const fullDateFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

interface BlogRightPanelProps {
  author?: BlogAuthor;
  date?: Date | string;
  tags?: BlogTag[];
  toc?: TOCItemType[];
  className?: string;
}

export function BlogRightPanel({
  author,
  date,
  tags = [],
  className,
}: BlogRightPanelProps) {
  const [copied, setCopied] = useState(false);
  const items = useTOCItems();
  const dateObj = date ? new Date(date) : undefined;

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn('flex flex-col gap-8 text-sm', className)}>
      {/* Author Section */}
      {author && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-normal text-neutral-400 dark:text-neutral-500">
            Author
          </span>
          <div className="flex items-center gap-3">
            {author.image && (
              <Image
                src={author.image}
                alt={author.name}
                width={36}
                height={36}
                unoptimized
                className="size-8 rounded-full object-cover border border-neutral-200/80 dark:border-neutral-800 shadow-2xs"
              />
            )}
            <div className="flex flex-col leading-snug">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                {author.name}
              </span>
              {author.title && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {author.title}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Date Section */}
      {dateObj && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-neutral-400 dark:text-neutral-500">
            Date
          </span>
          <time
            dateTime={dateObj.toISOString()}
            className="font-medium text-sm text-neutral-900 dark:text-neutral-100"
          >
            {fullDateFormat.format(dateObj)}
          </time>
        </div>
      )}

      {/* Tags Section */}
      {tags.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-normal text-neutral-400 dark:text-neutral-500">
            Tags
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={tag.url}
                className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Table of Contents (if available) */}
      {items.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-900">
          <span className="flex items-center gap-1.5 text-xs font-normal text-neutral-400 dark:text-neutral-500">
            <ListFilter className="size-3.5" />
            <span>On This Page</span>
          </span>
          <nav className="flex flex-col gap-1.5 max-h-[40vh] overflow-y-auto pr-1">
            {items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors line-clamp-1 py-0.5"
                style={{ paddingLeft: `${Math.max(0, (item.depth - 2) * 12)}px` }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Share this Blog Button (matching X blog design) */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900">
        <button
          type="button"
          onClick={handleShare}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span>{copied ? 'Link Copied' : 'Share this Blog'}</span>
          {copied ? (
            <Check className="size-3.5 text-emerald-500" />
          ) : (
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
