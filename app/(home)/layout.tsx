import type { ReactNode } from 'react';
import { gitConfig } from '@/lib/shared';
import Link from 'fumadocs-core/link';
import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import { LeftSidebar } from '@/components/sidebar/left-sidebar';
import { MobileHeader } from '@/components/sidebar/mobile-header';

export default function HomeLayout({ children }: { children: ReactNode }) {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Mobile Header (visible only on mobile/tablet < lg) */}
      <MobileHeader tags={tags} />

      {/* Main layout container */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 px-4 sm:px-6 lg:px-8">
        {/* Left Sidebar (visible on desktop lg:flex) */}
        <aside className="sticky top-0 hidden h-screen w-56 xl:w-60 shrink-0 flex-col justify-between py-8 lg:flex border-r border-neutral-100 dark:border-neutral-900 pr-6">
          <LeftSidebar tags={tags} />
        </aside>

        {/* Content area: Center column (+ optional Right panel on post pages) */}
        <main className="flex-1 min-w-0 lg:pl-10 xl:pl-12 py-6 sm:py-8 flex flex-col">
          <div className="flex-1 w-full">{children}</div>

          {/* Subtle footer */}
          <footer className="mt-16 border-t border-neutral-100 dark:border-neutral-900 py-6 text-xs text-neutral-400 dark:text-neutral-500">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p>© 2026 Relay. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link
                  href="/blog"
                  className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/blog/tags"
                  className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  Tags
                </Link>
                <Link
                  href="/rss.xml"
                  className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  RSS
                </Link>
                <a
                  href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
