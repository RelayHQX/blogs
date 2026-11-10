import { Feed } from 'feed';
import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts } from '@/lib/blog';
import { appName } from '@/lib/shared';

export function getRSS(baseUrl = 'https://blogs.relaymail.online') {
  const feed = new Feed({
    title: appName,
    description: 'The official blog of Relay Mail — insights, engineering, product updates, and news.',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, RelayMailHQ`,
    feedLinks: {
      rss: `${baseUrl}/rss.xml`,
    },
  });

  const posts = getPosts(blogSource.getPages(), blogAuthors);

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}${post.url}`,
      link: `${baseUrl}${post.url}`,
      description: post.description ?? '',
      date: post.date ?? new Date(),
      image: post.image
        ? post.image.startsWith('http')
          ? post.image
          : `${baseUrl}${post.image}`
        : undefined,
      author: post.authors.map((a) => ({
        name: a.name,
        link: a.url,
      })),
    });
  }

  return feed.rss2();
}
