import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import {
  BlogCards,
  BlogTagFilter,
  BlogEmpty,
  BlogBackLink,
  BlogTitle,
  BlogDescription,
} from '@/components/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, engineering stories, and product announcements from the Relay team.',
  openGraph: {
    title: 'Relay Blog',
    description: 'Insights, engineering stories, and product announcements from the Relay team.',
    url: 'https://blogs.relaymail.online/blog',
    siteName: 'Relay Blog',
    type: 'website',
    images: [
      {
        url: 'https://blogs.relaymail.online/blog/rethinkgmail.png',
        width: 1448,
        height: 1086,
        alt: 'Relay Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relay Blog',
    description: 'Insights, engineering stories, and product announcements from the Relay team.',
    images: ['https://blogs.relaymail.online/blog/rethinkgmail.png'],
  },
};

export default function BlogIndexPage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <div className="mx-auto w-full max-w-[1200px] pb-8">
      {/* Blog Hero Section */}
      <div className="mb-10 flex flex-col gap-3 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-300 uppercase">
              Relay Dispatch
            </span>
            <BlogTitle className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Blog & Insights
            </BlogTitle>
          </div>
          <div className="flex items-center gap-2.5">
            <BlogBackLink href="/blog/tags" icon="tags">
              All Tags
            </BlogBackLink>
            <BlogBackLink href="/rss.xml" icon="rss">
              RSS Feed
            </BlogBackLink>
          </div>
        </div>
        <BlogDescription className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          Thoughts, technical deep dives, and announcements from the team building the real-time communications infrastructure of the future.
        </BlogDescription>

        {/* Quick Tag Filter Pills */}
        <BlogTagFilter tags={tags} max={6} />
      </div>

      {/* Post Grid */}
      {posts.length > 0 ? (
        <BlogCards posts={posts} />
      ) : (
        <BlogEmpty />
      )}
    </div>
  );
}
