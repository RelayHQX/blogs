'use client';

import { useState } from 'react';
import Link from 'fumadocs-core/link';
import { Menu, X, Newspaper } from 'lucide-react';
import { RelayLogo } from '@/components/ui/relay-logo';
import { LeftSidebar } from './left-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchButton } from '@/components/search-button';
import type { BlogTag } from '@/lib/blog';

interface MobileHeaderProps {
  tags?: BlogTag[];
}

export function MobileHeader({ tags = [] }: MobileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-neutral-100 dark:border-neutral-900 bg-white/90 dark:bg-black/90 px-4 py-3 backdrop-blur-md lg:hidden">
      {/* Brand logo & title */}
      <Link href="/blog" className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
        <RelayLogo className="size-5.5 text-neutral-900 dark:text-white" />
        <span className="text-neutral-300 dark:text-neutral-700 font-light select-none">|</span>
        <Newspaper className="size-4 text-neutral-800 dark:text-neutral-200" />
        <span className="font-semibold text-sm tracking-tight">Blog</span>
      </Link>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <SearchButton />
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="inline-flex size-8 items-center justify-center rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-200 transition-colors"
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </div>

      {/* Mobile slide-down drawer */}
      {open && (
        <div className="fixed inset-x-0 top-[53px] bottom-0 z-50 overflow-y-auto bg-white dark:bg-black p-6 shadow-xl transition-all">
          <LeftSidebar tags={tags} onItemClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
