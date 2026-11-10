import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import { BlogCards } from '@/components/blog';
import Link from 'fumadocs-core/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, engineering stories, and product announcements from the Relay team.',
};

export default function BlogIndexPage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <div className="mx-auto w-full max-w-[850px]">
      {/* Blog Hero Section */}
      <div className="mb-10 flex flex-col gap-3 border-b border-neutral-100 dark:border-neutral-800/80 pb-8">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          The Blog
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Technical deep dives, research findings, and product announcements.
        </p>

        {/* Quick Tag Filter Pills */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-neutral-400 dark:text-neutral-500 mr-1">Topics:</span>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={tag.url}
                className="rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-2.5 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                #{tag.name} <span className="text-neutral-400 dark:text-neutral-500">({tag.count})</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Post Grid */}
      {posts.length > 0 ? (
        <BlogCards posts={posts} />
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 py-16 text-center">
          <p className="text-base font-medium text-neutral-800 dark:text-neutral-200">No posts published yet</p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Check back soon for new updates!
          </p>
        </div>
      )}
    </div>
  );
}
