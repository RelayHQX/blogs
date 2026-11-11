import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import {
  BlogCards,
  BlogTagFilter,
  BlogEmpty,
  BlogFeaturedCard,
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

  // The primary announcement post (Relay Manifesto)
  const featuredPost =
    posts.find((p) => p.url.includes('rethinkingemails')) ?? posts[0];
  const feedPosts = posts.filter((p) => p.url !== featuredPost?.url);

  return (
    <div className="mx-auto w-full max-w-[1360px] pb-24">
      {/* Top Header Row matching X blog: Insights & News from Relay + Search */}
      <div className="mb-12 flex items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-neutral-950 dark:text-white">
          Insights & News from Relay
        </h1>
      </div>

      {/* Hero Announcement Box: Clean, simple box card with NO gradients */}
      {featuredPost && (
        <div className="mb-20">
          <BlogFeaturedCard post={featuredPost} />
        </div>
      )}

      {/* Secondary Section Header matching X blog: Stories worth your time */}
      <div className="mb-12 flex flex-col gap-5 border-b border-neutral-100 dark:border-neutral-900/80 pb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            Stories worth your time
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 font-normal">
            <span>picks from the</span>
            <RelayLogo text=" elayHQ" className="h-[18px] sm:h-[16px] w-auto text-neutral-900 dark:text-neutral-400" />
          </p>
        </div>

        {/* Quick Tag Filter Pills */}
        <BlogTagFilter tags={tags} max={8} />
      </div>

      {/* Small box cards grid matching Claude / Anthropic reference (media_1794399664397_0abb09d9.jpg) */}
      {feedPosts.length > 0 ? (
        <BlogCards posts={feedPosts} />
      ) : posts.length > 0 ? (
        <BlogCards posts={posts} />
      ) : (
        <BlogEmpty />
      )}
    </div>
  );
}
