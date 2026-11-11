import type { ComponentProps } from 'react';
import type { TOCItemType } from 'fumadocs-core/toc';
import { TOCProvider } from '../toc';
import { cn } from '../../lib/cn';
import { BlogPanel } from './panel';

export interface BlogPageProps extends ComponentProps<'article'> {
  /** shows a floating panel with the table of contents and share button */
  toc?: TOCItemType[];
}

export function BlogPage({ toc = [], className, children, ...props }: BlogPageProps) {
  const article = (
    <article
      {...props}
      className={cn(
        'mx-auto flex w-full max-w-[760px] flex-col pb-16',
        className,
      )}
    >
      {children}
    </article>
  );

  return (
    <TOCProvider toc={toc}>
      {article}
      <BlogPanel />
    </TOCProvider>
  );
}
