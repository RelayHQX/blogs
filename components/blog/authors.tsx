import { Image } from 'fumadocs-core/framework';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import type { BlogAuthor } from '../../lib/blog';

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
                width={34}
                height={34}
                className="size-10 sm:size-11 rounded-full border border-neutral-200/90 dark:border-neutral-700 shadow-xs object-cover shrink-0"
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
