import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { gitConfig } from '@/lib/shared';
import Link from 'fumadocs-core/link';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Main floating editorial canvas */}
      <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col overflow-hidden bg-white dark:bg-[#12151c] transition-colors duration-300">
        {/* Navigation bar integrated at the top of the canvas */}
        <Navbar />

        {/* Content area */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
          {children}
        </main>

        {/* Subtle footer */}
        <footer className="mt-auto border-t border-neutral-100 dark:border-neutral-800/80 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <p>© 2026 Relay. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                Blog
              </Link>
              <Link href="/blog/tags" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                Tags
              </Link>
              <Link href="/rss.xml" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
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
      </div>
    </>
  );
}
