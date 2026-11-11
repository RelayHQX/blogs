import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts } from '@/lib/blog';
import { appName } from '@/lib/shared';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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

/**
 * Standard RSS 2.0 Feed Generator matching Google Blog specifications
 * Compatible with Brave News, Apple News, Feedly, and all major RSS aggregators.
 */
export function getRSS(baseUrl = 'https://blogs.relaymail.online'): string {
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const latestPost = posts[0];

  const buildDate = (latestPost?.date ?? new Date()).toUTCString();
  const channelLink = `${cleanBaseUrl}/blog`;
  const feedLink = `${cleanBaseUrl}/rss.xml`;
  const iconUrl = `${cleanBaseUrl}/favicon.png`;

  let channelCoverImage: string | undefined;
  if (latestPost?.image) {
    channelCoverImage = latestPost.image.startsWith('http')
      ? latestPost.image
      : `${cleanBaseUrl}${latestPost.image.startsWith('/') ? '' : '/'}${latestPost.image}`;
  }

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${cleanBaseUrl}${post.url}`;
      const pubDate = (post.date ?? new Date()).toUTCString();
      const authorName = post.authors.map((a) => a.name).join(', ') || 'RelayHQ';
      const description = post.description ?? post.title;

      let imageUrl: string | undefined;
      if (post.image) {
        imageUrl = post.image.startsWith('http')
          ? post.image
          : `${cleanBaseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`;
      }
      const mimeType = imageUrl ? getMimeType(imageUrl) : 'image/png';

      const mediaContentTag = imageUrl
        ? `      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${mimeType}" width="1448" height="1086"/>
      <media:thumbnail url="${escapeXml(imageUrl)}"/>`
        : '';

      const htmlContent = imageUrl
        ? `<img src="${escapeXml(imageUrl)}" alt="${escapeXml(post.title)}" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:12px;" /><p>${escapeXml(description)}</p>`
        : `<p>${escapeXml(description)}</p>`;

      const categoriesXml = post.tags
        .map((tag) => `      <category><![CDATA[${tag.name}]]></category>`)
        .join('\n');

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${htmlContent}]]></description>
      <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      <dc:creator><![CDATA[${authorName}]]></dc:creator>
${mediaContentTag ? mediaContentTag + '\n' : ''}${categoriesXml}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>${escapeXml(appName)}</title>
    <link>${channelLink}</link>
    <description>Insights, engineering deep dives, and product news from the Relay team.</description>
    <atom:link href="${feedLink}" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <image>
      <url>${iconUrl}</url>
      <title>${escapeXml(appName)}</title>
      <link>${channelLink}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <webfeeds:icon>${iconUrl}</webfeeds:icon>
    <webfeeds:logo>${iconUrl}</webfeeds:logo>
    <webfeeds:accentColor>059669</webfeeds:accentColor>
    ${channelCoverImage ? `<webfeeds:cover image="${escapeXml(channelCoverImage)}" />` : ''}
${itemsXml}
  </channel>
</rss>`;
}

/**
 * Standard Atom 1.0 Feed Generator
 */
export function getAtom(baseUrl = 'https://blogs.relaymail.online'): string {
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const latestPost = posts[0];

  const updatedDate = (latestPost?.date ?? new Date()).toISOString();
  const channelLink = `${cleanBaseUrl}/blog`;
  const feedLink = `${cleanBaseUrl}/atom.xml`;
  const iconUrl = `${cleanBaseUrl}/favicon.png`;

  const entriesXml = posts
    .map((post) => {
      const postUrl = `${cleanBaseUrl}${post.url}`;
      const published = (post.date ?? new Date()).toISOString();
      const authorName = post.authors.map((a) => a.name).join(', ') || 'RelayHQ';
      const description = post.description ?? post.title;

      let imageUrl: string | undefined;
      if (post.image) {
        imageUrl = post.image.startsWith('http')
          ? post.image
          : `${cleanBaseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`;
      }

      const mediaContent = imageUrl
        ? `<media:content url="${escapeXml(imageUrl)}" medium="image"/>
      <media:thumbnail url="${escapeXml(imageUrl)}"/>`
        : '';

      const htmlContent = imageUrl
        ? `<p><img src="${escapeXml(imageUrl)}" alt="${escapeXml(post.title)}" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:12px;" /></p><p>${escapeXml(description)}</p>`
        : `<p>${escapeXml(description)}</p>`;

      const categoriesXml = post.tags
        .map((tag) => `      <category term="${escapeXml(tag.name)}"/>`)
        .join('\n');

      return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${postUrl}"/>
    <id>${postUrl}</id>
    <published>${published}</published>
    <updated>${published}</updated>
    <summary type="text">${escapeXml(description)}</summary>
    <content type="html"><![CDATA[${htmlContent}]]></content>
    <author>
      <name>${escapeXml(authorName)}</name>
      <email>sohamglxi@gmail.com</email>
      <uri>${channelLink}</uri>
    </author>
${mediaContent ? '    ' + mediaContent + '\n' : ''}${categoriesXml}
  </entry>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <title>${escapeXml(appName)}</title>
  <link href="${channelLink}"/>
  <link href="${feedLink}" rel="self"/>
  <updated>${updatedDate}</updated>
  <id>${channelLink}</id>
  <icon>${iconUrl}</icon>
  <logo>${iconUrl}</logo>
  <webfeeds:icon>${iconUrl}</webfeeds:icon>
  <webfeeds:logo>${iconUrl}</webfeeds:logo>
  <webfeeds:accentColor>059669</webfeeds:accentColor>
  <subtitle>Insights, engineering deep dives, and product news from the Relay team.</subtitle>
${entriesXml}
</feed>`;
}
