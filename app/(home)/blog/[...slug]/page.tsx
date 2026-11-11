import { notFound } from 'next/navigation';
import Link from 'fumadocs-core/link';
import { ChevronLeft } from 'lucide-react';
import { blogAuthors, blogSource } from '@/lib/source';
import { findPost, getPosts, getReadingTime } from '@/lib/blog';
import { getMDXComponents } from '@/components/mdx';
import {
  BlogPage,
  BlogCoverImage,
  BlogBody,
  BlogPostNav,
  BlogRightPanel,
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
  const primaryTag = current.post.tags[0];

  const MDX = page.data.body;

  return (
    <BlogPage toc={page.data.toc}>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 xl:gap-16">
        {/* Main Article Column */}
        <article className="flex-1 min-w-0 max-w-[760px] w-full pb-16">
          {/* Breadcrumb matching Image 1: < Blog / Tag */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            <Link
              href="/blog"
              className="inline-flex size-7.5 items-center justify-center rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors shadow-2xs"
              title="Back to Blog"
            >
              <ChevronLeft className="size-4" />
            </Link>
            <div className="flex items-center gap-1.5 font-medium">
              <Link
                href="/blog"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              {primaryTag ? (
                <Link
                  href={primaryTag.url}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {primaryTag.name}
                </Link>
              ) : (
                <span>Article</span>
              )}
            </div>
          </div>

          {/* Title matching Image 1 & 2 */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.15] mb-6">
            {page.data.title}
          </h1>

          {/* Cover image */}
          {page.data.image && (
            <BlogCoverImage
              src={page.data.image}
              alt={page.data.title}
            />
          )}

          {/* Byline below cover image matching Image 1 */}
          {primaryAuthor && (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-8">
              By{' '}
              <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                {primaryAuthor.name}
              </span>
              {primaryAuthor.title && `, ${primaryAuthor.title}`}
              {readingTime && (
                <>
                  <span className="mx-2 text-neutral-300 dark:text-neutral-700 select-none">•</span>
                  <span>{readingTime}</span>
                </>
              )}
            </p>
          )}

          {/* Mobile Metadata (visible only on mobile/tablet < lg) */}
          <div className="mb-8 lg:hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/50 p-4">
            <BlogRightPanel
              author={primaryAuthor}
              date={current.post.date}
              tags={current.post.tags}
              toc={page.data.toc}
            />
          </div>

          {/* Article Body */}
          <BlogBody className="mt-6 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
            <MDX components={getMDXComponents()} />
          </BlogBody>

          {/* Post Navigation */}
          <div className="mt-14 pt-8 border-t border-neutral-100 dark:border-neutral-900">
            <BlogPostNav newer={current.newer} older={current.older} />
          </div>
        </article>

        {/* Right Panel matching Image 1 & 2 ("the right panel stay there") */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-8 h-fit self-start pt-2">
          <BlogRightPanel
            author={primaryAuthor}
            date={current.post.date}
            tags={current.post.tags}
            toc={page.data.toc}
          />
        </aside>
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
