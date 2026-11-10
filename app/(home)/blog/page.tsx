import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import { BlogCards } from '@/components/blog';
import Link from 'fumadocs-core/link';
import { RssIcon, TagIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, engineering stories, and product announcements from the Relay team.',
};

export default function BlogIndexPage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Blog Hero Section */}
      <div className="mb-10 flex flex-col gap-3 border-b pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-fd-primary uppercase">
              Relay Dispatch
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Blog & Insights
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/blog/tags"
              className="inline-flex items-center gap-1.5 rounded-lg border bg-fd-card px-3 py-1.5 text-xs sm:text-sm font-medium text-fd-card-foreground shadow-2xs transition-colors hover:bg-fd-accent"
            >
              <TagIcon className="size-3.5 text-fd-muted-foreground" />
              All Tags
            </Link>
            <Link
              href="/rss.xml"
              className="inline-flex items-center gap-1.5 rounded-lg border bg-fd-card px-3 py-1.5 text-xs sm:text-sm font-medium text-fd-card-foreground shadow-2xs transition-colors hover:bg-fd-accent"
            >
              <RssIcon className="size-3.5 text-orange-500" />
              RSS Feed
            </Link>
          </div>
        </div>
        <p className="max-w-2xl text-base text-fd-muted-foreground sm:text-lg">
          Thoughts, technical deep dives, and announcements from the team building the real-time communications infrastructure of the future.
        </p>

        {/* Quick Tag Pills */}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-medium text-fd-muted-foreground">Topics:</span>
            {tags.slice(0, 6).map((tag) => (
              <Link
                key={tag.slug}
                href={tag.url}
                className="rounded-full bg-fd-secondary px-3 py-1 text-xs font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent"
              >
                #{tag.name} <span className="text-fd-muted-foreground">({tag.count})</span>
              </Link>
            ))}
            {tags.length > 6 && (
              <Link
                href="/blog/tags"
                className="text-xs font-medium text-fd-primary hover:underline"
              >
                + {tags.length - 6} more
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Post Grid */}
      {posts.length > 0 ? (
        <BlogCards posts={posts} />
      ) : (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="text-lg font-medium text-fd-foreground">No posts published yet</p>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            Check back soon for new updates!
          </p>
        </div>
      )}
    </div>
  );
}
