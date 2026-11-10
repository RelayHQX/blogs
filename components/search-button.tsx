'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { SearchIcon } from 'lucide-react';

export function SearchButton() {
  const { enabled, setOpenSearch } = useSearchContext();

  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="Search posts"
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-800/60 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors cursor-pointer"
    >
      <SearchIcon className="size-3.5" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline rounded bg-neutral-200/70 dark:bg-neutral-700/70 px-1 py-0.5 text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
        ⌘K
      </kbd>
    </button>
  );
}
