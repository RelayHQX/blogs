import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs.relaymail.online'),
  title: {
    template: '%s | Relay Blog',
    default: 'Relay Blog',
  },
  description: 'The official blog of Relay — insights, engineering deep dives, and product news.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Relay Blog',
    description: 'The official blog of Relay — insights, engineering deep dives, and product news.',
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
    description: 'The official blog of Relay — insights, engineering deep dives, and product news.',
    images: ['https://blogs.relaymail.online/blog/rethinkgmail.png'],
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          title: 'Relay Blog',
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
