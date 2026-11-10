'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="size-8" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle light/dark theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex size-8 items-center justify-center rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
    >
      {isDark ? (
        <SunIcon className="size-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <MoonIcon className="size-4 text-neutral-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
