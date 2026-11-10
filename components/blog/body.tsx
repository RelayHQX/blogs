import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

/** Typography styling container for rendered MDX blog post content */
export function BlogBody(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn('prose prose-neutral dark:prose-invert max-w-none min-w-0', props.className)}
    />
  );
}
