'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-neutral-100 dark:border-neutral-900 bg-white/90 dark:bg-black/90 px-4 backdrop-blur-md lg:hidden">
      <Link
        href="/blog"
        className="flex min-w-0 items-center gap-2 text-neutral-900 dark:text-neutral-100"
      >
        <RelayLogo className="h-4 w-auto shrink-0 text-neutral-900 dark:text-white" />
        <span className="text-neutral-300 dark:text-neutral-700 font-light select-none">|</span>
        <Newspaper className="size-4 shrink-0 text-neutral-800 dark:text-neutral-200" />
        <span className="font-semibold text-sm tracking-tight">Blog</span>
      </Link>

      <div className="flex shrink-0 items-center gap-1.5">
        <SearchButton iconOnly />
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="inline-flex size-8 items-center justify-center rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-200 transition-colors"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="absolute inset-x-0 top-14 bottom-0 overflow-y-auto bg-white dark:bg-black px-4 py-6">
              <LeftSidebar tags={tags} compact onItemClick={() => setOpen(false)} />
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
