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

export function getBaseUrl(req?: Request): string {
  if (!req) return 'https://blogs.relaymail.online';

  const host =
    req.headers.get('x-forwarded-host') ||
    req.headers.get('host') ||
    'blogs.relaymail.online';

  const proto =
    req.headers.get('x-forwarded-proto') ||
    (host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https');

  return `${proto}://${host}`;
}

export function buildFeed(baseUrl = 'https://blogs.relaymail.online') {
  // Ensure no trailing slash
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');

  // Dynamically load all published blog posts (auto-sorted newest first)
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const latestPost = posts[0];

  // Dynamically resolve channel image from latest post or fallback to brand logo
  let channelImage = `${cleanBaseUrl}/favicon.png`;
  if (latestPost?.image) {
    channelImage = latestPost.image.startsWith('http')
      ? latestPost.image
      : `${cleanBaseUrl}${latestPost.image.startsWith('/') ? '' : '/'}${latestPost.image}`;
  }

  // Dynamic feed author from the latest post or fallback to default
  const defaultAuthorName = latestPost?.authors[0]?.name || 'RelayHQ';
  const defaultAuthorEmail = latestPost?.authors[0]?.email || 'sohamglxi@gmail.com';
  const defaultAuthorLink = latestPost?.authors[0]?.url || `${cleanBaseUrl}/blog`;

  const feed = new Feed({
    title: appName,
    description: 'Insights, engineering deep dives, and product news from the Relay team.',
    id: `${cleanBaseUrl}/blog`,
    link: `${cleanBaseUrl}/blog`,
    language: 'en',
    image: channelImage,
    favicon: `${cleanBaseUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, RelayHQ`,
    updated: latestPost?.date ?? new Date(),
    feedLinks: {
      rss: `${cleanBaseUrl}/rss.xml`,
      atom: `${cleanBaseUrl}/atom.xml`,
    },
    author: {
      name: defaultAuthorName,
      email: defaultAuthorEmail,
      link: defaultAuthorLink,
    },
  });

  // Add Yahoo Media RSS namespace for Brave News and modern aggregators
  feed.addExtension({
    name: '_attributes',
    objects: {
      'xmlns:media': 'http://search.yahoo.com/mrss/',
    },
  });

  for (const post of posts) {
    const postUrl = `${cleanBaseUrl}${post.url}`;
    const authorName = post.authors.map((a) => a.name).join(', ') || defaultAuthorName;
    const authorEmail = post.authors[0]?.email || defaultAuthorEmail;
    const authorLink = post.authors[0]?.url || defaultAuthorLink;

    let imageUrl: string | undefined;
    if (post.image) {
      imageUrl = post.image.startsWith('http')
        ? post.image
        : `${cleanBaseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`;
    }

    const mimeType = imageUrl ? getMimeType(imageUrl) : 'image/png';
    const postCategories = post.tags.map((t) => ({ name: t.name }));

    // Extended tags for RSS readers
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

    // HTML content formatted with responsive cover image for RSS readers
    const htmlContent = imageUrl
      ? `<p><img src="${imageUrl}" alt="${post.title}" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:12px;" /></p><p>${post.description ?? post.title}</p>`
      : `<p>${post.description ?? post.title}</p>`;

    feed.addItem({
      title: post.title,
      // Omit `id` so `feed` automatically generates `<guid isPermaLink="true">` matching `link`
      link: postUrl,
      description: post.description ?? '',
      content: htmlContent,
      date: post.date ?? new Date(),
      image: imageUrl,
      enclosure: imageUrl ? { url: imageUrl, type: mimeType } : undefined,
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
