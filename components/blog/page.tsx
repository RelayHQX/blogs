import type { ComponentProps } from 'react';
import type { TOCItemType } from 'fumadocs-core/toc';
import { TOCProvider } from '../toc';
import { cn } from '../../lib/cn';

export interface BlogPageProps extends ComponentProps<'div'> {
  /** table of contents items for the page */
  toc?: TOCItemType[];
}

export function BlogPage({ toc = [], className, children, ...props }: BlogPageProps) {
  return (
    <TOCProvider toc={toc}>
      <div {...props} className={cn('w-full', className)}>
        {children}
      </div>
    </TOCProvider>
  );
}
