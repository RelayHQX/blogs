import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import { BlogTagCards } from '@/components/blog';
import Link from 'fumadocs-core/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags',
  description: 'Browse all articles and topics on Relay Blog.',
};

export default function TagsPage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <div className="mx-auto flex w-full max-w-[850px] flex-col gap-8">
      <div>
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-1 rounded-md border border-neutral-200/90 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs"
        >
          &lt; Go Back
        </Link>
        <h1 className="mt-6 text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          All Topics & Tags
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Browse articles grouped by subject matter and categories.
        </p>
      </div>

      <BlogTagCards tags={tags} />
    </div>
  );
}
