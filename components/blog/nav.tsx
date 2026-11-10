import Link from 'fumadocs-core/link';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { BlogPost } from '../../lib/blog';

/** Previous / Next post bottom navigation */
export function BlogPostNav({
  newer,
  older,
  className,
  ...props
}: ComponentProps<'nav'> & { newer?: BlogPost; older?: BlogPost }) {
  if (!newer && !older) return null;

  return (
    <nav {...props} className={cn('grid gap-4 sm:grid-cols-2 pt-8 border-t border-neutral-100 dark:border-neutral-800/80', className)}>
      {newer ? (
        <PostLink post={newer} className="text-left">
          <ChevronLeftIcon className="size-3.5 rtl:rotate-180" />
          Newer Post
        </PostLink>
      ) : <div />}
      {older && (
        <PostLink post={older} className="text-right sm:items-end sm:col-start-2">
          Older Post
          <ChevronRightIcon className="size-3.5 rtl:rotate-180" />
        </PostLink>
      )}
    </nav>
  );
}

export function PostLink({
  post,
  className,
  children,
}: {
  post: BlogPost;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={post.url}
      className={cn(
        'flex flex-col gap-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-4 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 shadow-2xs',
        className,
      )}
    >
      <span className="inline-flex items-center gap-1 text-xs font-normal text-neutral-400 dark:text-neutral-500">
        {children}
      </span>
      <span className="font-medium text-xs sm:text-sm line-clamp-1 text-neutral-800 dark:text-neutral-200">
        {post.title}
      </span>
    </Link>
  );
}
