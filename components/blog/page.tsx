import type { ComponentProps } from 'react';
import type { TOCItemType } from 'fumadocs-core/toc';
import { TOCProvider } from '../toc';
import { cn } from '../../lib/cn';
import { BlogPanel } from './panel';

export interface BlogPageProps extends ComponentProps<'article'> {
  /** shows a floating panel with the table of contents and share button */
  toc?: TOCItemType[];
}

export function BlogPage({ toc, className, ...props }: BlogPageProps) {
  const article = (
    <article
      {...props}
      className={cn(
        'mx-auto flex w-full max-w-212.5 flex-col gap-8 px-4 py-8 sm:px-6',
        // extra room for floating TOC/Share panel at bottom
        toc && 'pb-24',
        className,
      )}
    />
  );

  if (!toc) return article;

  return (
    <TOCProvider toc={toc}>
      {article}
      <BlogPanel />
    </TOCProvider>
  );
}
