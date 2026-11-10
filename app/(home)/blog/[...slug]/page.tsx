import { notFound } from 'next/navigation';
import { blogAuthors, blogSource } from '@/lib/source';
import { findPost, getPosts, getReadingTime } from '@/lib/blog';
import { getMDXComponents } from '@/components/mdx';
import { BlogPostNav } from '@/components/blog';
import { Image } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import type { Metadata } from 'next';
import { getPageImageUrl } from '@/lib/shared';
import { TOCProvider } from '@/components/toc';
import { BlogPanel } from '@/components/blog/panel';
import { ArrowLeft } from 'lucide-react';

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
    <TOCProvider toc={page.data.toc}>
      <article className="mx-auto flex w-full max-w-[760px] flex-col pb-16">
        {/* "< Go Back" navigation button matching the mockup */}
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-1 rounded-md border border-neutral-200/90 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs"
        >
          <ArrowLeft className="size-3.5" /> Go Back
        </Link>

        {/* Clean, elegant title matching the screenshot */}
        <h1 className="mt-6 text-2xl sm:text-3xl lg:text-[34px] font-normal sm:font-medium tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.25]">
          {page.data.title}
        </h1>

        {/* Author info */}
        {primaryAuthor && (
          <div className="mt-4 flex items-center gap-3">
            {primaryAuthor.image && (
              <Image
                src={primaryAuthor.image}
                alt={primaryAuthor.name}
                width={34}
                height={34}
                className="rounded-full border border-neutral-200/90 dark:border-neutral-700/80 object-cover shadow-2xs shrink-0"
              />
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {primaryAuthor.name}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {current.post.date && (
                  <time dateTime={current.post.date.toISOString()}>
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(current.post.date)}
                  </time>
                )}
                {readingTime && (
                  <>
                    <span>•</span>
                    <span>{readingTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cover image */}
        {page.data.image && (
          <div className="mt-6 overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50 shadow-xs">
            <Image
              src={page.data.image}
              alt={page.data.title}
              width={1200}
              height={630}
              priority
              className="aspect-[16/10] sm:aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
          <MDX components={getMDXComponents()} />
        </div>

        {/* Post Navigation */}
        <div className="mt-12">
          <BlogPostNav newer={current.newer} older={current.older} />
        </div>
      </article>

      {/* Floating TOC + Share button */}
      <BlogPanel />
    </TOCProvider>
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
