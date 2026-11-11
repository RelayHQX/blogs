import { notFound } from 'next/navigation';
import { blogAuthors, blogSource } from '@/lib/source';
import { findPost, getPosts, getReadingTime } from '@/lib/blog';
import { getMDXComponents } from '@/components/mdx';
import {
  BlogPage,
  BlogBackLink,
  BlogTitle,
  BlogAuthorMeta,
  BlogCoverImage,
  BlogBody,
  BlogPostNav,
} from '@/components/blog';
import type { Metadata } from 'next';
import { getPageImageUrl } from '@/lib/shared';

export default async function BlogPostPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);

  if (!page) notFound();

  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const current = findPost(posts, page.url);

  if (!current) notFound();

  const text = await page.data.getText('processed').catch(() => '');
  const readingTime = page.data.readingTime || getReadingTime(text);
  const primaryAuthor = current.post.authors[0];

  const MDX = page.data.body;

  return (
    <BlogPage toc={page.data.toc}>
      {/* "< Go Back" navigation pill matching mockup */}
      <BlogBackLink href="/blog">Go Back</BlogBackLink>

      {/* Clean, elegant title matching reference screenshot */}
      <BlogTitle>{page.data.title}</BlogTitle>

      {/* Author info */}
      {primaryAuthor && (
        <BlogAuthorMeta
          author={primaryAuthor}
          date={current.post.date}
          readingTime={readingTime}
        />
      )}

      {/* Cover image */}
      {page.data.image && (
        <BlogCoverImage
          src={page.data.image}
          alt={page.data.title}
        />
      )}

      {/* Article Body */}
      <BlogBody className="mt-8 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
        <MDX components={getMDXComponents()} />
      </BlogBody>

      {/* Post Navigation */}
      <div className="mt-12">
        <BlogPostNav newer={current.newer} older={current.older} />
      </div>
    </BlogPage>
  );
}

export function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);

  if (!page) notFound();

  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const current = findPost(posts, page.url);
  const ogImage = page.data.image || getPageImageUrl(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    authors: current?.post.authors.map((a) => ({ name: a.name, url: a.url })),
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      publishedTime: page.data.date ? new Date(page.data.date).toISOString() : undefined,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  };
}
