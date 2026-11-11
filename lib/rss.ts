import { Feed } from 'feed';
import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts } from '@/lib/blog';
import { appName } from '@/lib/shared';

function getMimeType(url: string): string {
  const ext = url.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/jpeg';
  }
}

export function buildFeed(baseUrl = 'https://blogs.relaymail.online') {
  // Ensure no trailing slash
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');

  const feed = new Feed({
    title: appName,
    description: 'The official blog of Relay Mail — insights, engineering, product updates, and news.',
    id: `${cleanBaseUrl}/blog`,
    link: `${cleanBaseUrl}/blog`,
    language: 'en',
    image: `${cleanBaseUrl}/blog/gradient_4096x2304.png`,
    favicon: `${cleanBaseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, RelayMailHQ`,
    feedLinks: {
      rss: `${cleanBaseUrl}/rss.xml`,
      atom: `${cleanBaseUrl}/atom.xml`,
    },
    author: {
      name: 'RelayHQ',
      email: 'contact@relaymail.online',
      link: `${cleanBaseUrl}/blog`,
    },
  });

  // Add Yahoo Media RSS namespace for Brave News and modern aggregators
  feed.addExtension({
    name: '_attributes',
    objects: {
      'xmlns:media': 'http://search.yahoo.com/mrss/',
    },
  });

  const posts = getPosts(blogSource.getPages(), blogAuthors);

  for (const post of posts) {
    const postUrl = `${cleanBaseUrl}${post.url}`;
    const authorName = post.authors.map((a) => a.name).join(', ') || 'RelayHQ';
    const authorEmail = post.authors[0]?.email || 'contact@relaymail.online';
    const authorLink = post.authors[0]?.url || `${cleanBaseUrl}/blog`;

    let imageUrl: string | undefined;
    if (post.image) {
      imageUrl = post.image.startsWith('http')
        ? post.image
        : `${cleanBaseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`;
    }

    const mimeType = imageUrl ? getMimeType(imageUrl) : 'image/png';
    const postCategories = post.tags.map((t) => ({ name: t.name }));

    const extensions: { name: string; objects: Record<string, unknown> }[] = [
      {
        name: 'dc:creator',
        objects: { _cdata: authorName },
      },
    ];

    if (imageUrl) {
      extensions.push({
        name: 'media:content',
        objects: {
          _attributes: {
            url: imageUrl,
            medium: 'image',
            type: mimeType,
          },
        },
      });
    }

    feed.addItem({
      title: post.title,
      // Omit `id` so `feed` automatically generates `<guid isPermaLink="true">` matching `link`
      link: postUrl,
      description: post.description ?? '',
      content: `<p>${post.description ?? post.title}</p>`,
      date: post.date ?? new Date(),
      image: imageUrl,
      author: [
        {
          name: authorName,
          email: authorEmail,
          link: authorLink,
        },
      ],
      category: postCategories,
      extensions,
    });
  }

  return feed;
}

export function getRSS(baseUrl?: string): string {
  return buildFeed(baseUrl).rss2();
}

export function getAtom(baseUrl?: string): string {
  return buildFeed(baseUrl).atom1();
}
