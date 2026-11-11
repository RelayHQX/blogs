import Link from 'fumadocs-core/link';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import type { BlogPost } from '../../lib/blog';

export function BlogCards({
  posts,
  className,
  ...props
}: ComponentProps<'div'> & { posts: BlogPost[] }) {
  return (
    <div
      {...props}
      className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2', className)}
    >
      {posts.map((post) => (
        <BlogCard key={post.url} post={post} />
      ))}
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  const primaryAuthor = post.authors[0];

  return (
    <Link
      href={post.url}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      {post.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
          {post.readingTime ? (
            <span>{post.readingTime}</span>
          ) : (
            post.tags[0] && <span>#{post.tags[0].name}</span>
          )}
          {post.date && (
            <time dateTime={post.date.toISOString()}>
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(post.date)}
            </time>
          )}
        </div>

        <h2 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {post.description && (
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
          {primaryAuthor?.image && (
            <Image
              src={primaryAuthor.image}
              alt={primaryAuthor.name}
              width={38}
              height={38}
              unoptimized
              className="size-8.5 sm:size-9 rounded-full border border-neutral-200/80 dark:border-neutral-700/80 object-cover shadow-2xs shrink-0"
            />
          )}
          <span className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 font-medium">
            {primaryAuthor?.name}
          </span>
        </div>
      </div>
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
    <div className={cn('rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 py-16 text-center', className)}>
      <p className="text-base sm:text-lg font-medium text-neutral-800 dark:text-neutral-200">{title}</p>
      <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  );
}
