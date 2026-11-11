'use client';

import Link from 'fumadocs-core/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { appName } from '@/lib/shared';
import { ThemeToggle } from './theme-toggle';
import { SearchButton } from './search-button';
import { cn } from '@/lib/cn';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: 'Blog', href: '/blog' },
    { label: 'Tags', href: '/blog/tags' },
    { label: 'RSS', href: '/rss.xml' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-100/90 dark:border-neutral-800/80 bg-white/80 dark:bg-[#12151c]/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand logo & name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 transition-opacity hover:opacity-90"
        >
          <Image
            src="/favicon.png"
            alt={appName}
            width={26}
            height={26}
            priority
            className="size-6 sm:size-6.5 rounded-md object-contain transition-transform duration-200 group-hover:scale-105 shadow-2xs"
          />
          <span className="font-semibold text-base tracking-tight">{appName}</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs font-medium transition-colors',
                  isActive
                    ? 'text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Search, Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
