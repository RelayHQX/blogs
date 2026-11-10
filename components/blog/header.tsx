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

/** 
 * Blog post title. 
 * Default font size is adjusted to be sleek and proportional (text-2xl sm:text-3xl lg:text-4xl).
 * Pass custom className to easily override (e.g. className="text-xl sm:text-2xl").
 */
export function BlogTitle(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={cn('text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-fd-foreground', props.className)}
    />
  );
}

/** Blog post description / subtitle */
export function BlogDescription(props: ComponentProps<'p'>) {
  return (
    <p
      {...props}
      className={cn('text-base sm:text-lg text-fd-muted-foreground empty:hidden', props.className)}
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
