import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs.relaymail.net'),
  title: {
    template: '%s | Relay Blog',
    default: 'Relay Blog',
  },
  description: 'The official blog of Relay — insights, engineering deep dives, and product news.',
  alternates: {
    types: {
      'application/rss+xml': [
        {
          title: 'Relay Blog RSS Feed',
          url: '/rss.xml',
        },
      ],
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{ enabled: true }}
          theme={{
            scriptProps: { async: true },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
