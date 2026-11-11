import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import {
  BlogCards,
  BlogTagFilter,
  BlogEmpty,
} from '@/components/blog';
import { RelayLogo } from '@/components/ui/relay-logo';
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
      {/* Blog Hero Section matching X blog style */}
      <div className="mb-10 flex flex-col gap-4 border-b border-neutral-100 dark:border-neutral-900 pb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.12]">
            Stories worth your time
          </h1>
          <p className="mt-2.5 flex items-center gap-2 text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-normal">
            <span>picks from the</span>
            <RelayLogo className="size-4.5 sm:size-5 text-neutral-800 dark:text-neutral-200" />
            <span>team</span>
          </p>
        </div>

        {/* Quick Tag Filter Pills */}
        <BlogTagFilter tags={tags} max={8} />
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
