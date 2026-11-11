import Image from 'next/image';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import type { BlogAuthor } from '../../lib/blog';

/** Multiple authors display */
export function BlogAuthors({
  authors,
  className,
  ...props
}: ComponentProps<'div'> & { authors: BlogAuthor[] }) {
  return (
    <div {...props} className={cn('flex flex-row flex-wrap gap-x-6 gap-y-2', className)}>
      {authors.map((author) => {
        const content = (
          <>
            {author.image && (
              <Image
                src={author.image}
                alt={author.name}
                width={48}
                height={48}
                unoptimized
                className="size-11 sm:size-12 rounded-full border border-neutral-200/90 dark:border-neutral-700 shadow-xs object-cover shrink-0"
              />
            )}
            <span className="flex flex-col leading-tight">
              <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">{author.name}</span>
              {author.title && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{author.title}</span>
              )}
            </span>
          </>
        );

        return author.url ? (
          <a
            key={author.name}
            href={author.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-sm transition-colors hover:text-fd-primary"
          >
            {content}
          </a>
        ) : (
          <span key={author.name} className="inline-flex items-center gap-2.5 text-sm">
            {content}
          </span>
        );
      })}
    </div>
  );
}

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

/** Single author metadata row with avatar, name, publish date, and reading time */
export function BlogAuthorMeta({
  author,
  date,
  readingTime,
  className,
}: {
  author: BlogAuthor;
  date?: Date | string;
  readingTime?: string;
  className?: string;
}) {
  const dateObj = date ? new Date(date) : undefined;

  return (
    <div className={cn('mt-4 flex items-center gap-3', className)}>
      {author.image && (
        <Image
          src={author.image}
          alt={author.name}
          width={44}
          height={44}
          unoptimized
          className="size-10 sm:size-11 rounded-full border border-neutral-200/90 dark:border-neutral-700/80 object-cover shadow-2xs shrink-0"
        />
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {author.name}
        </span>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          {dateObj && (
            <time dateTime={dateObj.toISOString()}>
              {dateFormat.format(dateObj)}
            </time>
          )}
          {readingTime && (
            <>
              <span>•</span>
              <span>{readingTime}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
