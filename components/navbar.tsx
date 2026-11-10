'use client';

import Link from 'fumadocs-core/link';
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
    <header className="flex w-full items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 px-6 py-4 sm:px-8">
      {/* Brand logo & name with 8-pointed asterisk spark icon */}
      <Link
        href="/"
        className="group flex items-center gap-2 text-neutral-900 dark:text-neutral-100 transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4.5 text-neutral-900 dark:text-neutral-100 transition-transform group-hover:rotate-45 duration-300"
        >
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
        </svg>
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

      {/* Right Controls: Search, Theme Toggle, CTA Pill */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <SearchButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
