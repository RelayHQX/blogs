import Link from 'fumadocs-core/link';
import Image from 'next/image';
import { ArrowLeft, TagIcon, Rss } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

/** Top section container for blog post pages */
export function BlogHeader(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col items-start gap-4 border-b bg-transparent pb-8 text-fd-card-foreground',
        props.className,
      )}
    />
  );
}

export interface BlogBackLinkProps extends ComponentProps<typeof Link> {
  icon?: 'arrow' | 'tags' | 'rss' | 'none';
}

/** Sleek pill back/navigation link */
export function BlogBackLink({
  href = '/blog',
  children = 'Go Back',
  icon = 'arrow',
  className,
  ...props
}: BlogBackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-md border border-neutral-200/90 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs',
        className,
      )}
      {...props}
    >
      {icon === 'tags' ? (
        <TagIcon className="size-3.5 text-neutral-500" />
      ) : icon === 'rss' ? (
        <Rss className="size-3.5 text-orange-500" />
      ) : icon === 'none' ? null : (
        <ArrowLeft className="size-3.5" />
      )}
      <span>{children}</span>
    </Link>
  );
}

/** 
 * Blog post title. 
 * Sleek, proportional typography matching modern editorial designs.
 */
export function BlogTitle(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={cn(
        'mt-6 text-2xl sm:text-3xl lg:text-[34px] font-normal sm:font-medium tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.25]',
        props.className,
      )}
    />
  );
}

/** Blog post description / subtitle */
export function BlogDescription(props: ComponentProps<'p'>) {
  return (
    <p
      {...props}
      className={cn(
        'text-base sm:text-lg text-neutral-600 dark:text-neutral-400 empty:hidden leading-relaxed',
        props.className,
      )}
    />
  );
}

/** Formatted date with HTML <time> tag */
export function BlogDate({
  date,
  ...props
}: Omit<ComponentProps<'time'>, 'children'> & { date: Date | string }) {
  const value = new Date(date);

  return (
    <time dateTime={value.toISOString()} {...props}>
      {dateFormat.format(value)}
    </time>
  );
}

/** Reusable cover image component with rounded borders and responsive sizing */
export function BlogCoverImage({
  src,
  alt,
  className,
  priority = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative mt-6 w-full overflow-hidden border border-neutral-100 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50 shadow-xs rounded-t-2xl',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1448}
        height={1086}
        priority={priority}
        unoptimized
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 100vw, 760px"
      />
    </div>
  );
}
