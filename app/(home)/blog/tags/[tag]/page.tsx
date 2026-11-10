import { notFound } from 'next/navigation';
import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTagPosts, getTags } from '@/lib/blog';
import { BlogCards } from '@/components/blog';
import Link from 'fumadocs-core/link';
import type { Metadata } from 'next';

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const result = getTagPosts(posts, params.tag);

  if (!result) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[850px] flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href="/blog/tags"
            className="inline-flex w-fit items-center gap-1 rounded-md border border-neutral-200/90 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs"
          >
            &lt; All Tags
          </Link>
          <span className="text-xs text-neutral-400">/</span>
          <Link
            href="/blog"
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
        </div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          #{result.tag.name}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Showing {result.posts.length} {result.posts.length === 1 ? 'article' : 'articles'} filed under #{result.tag.name}.
        </p>
      </div>

      <BlogCards posts={result.posts} />
    </div>
  );
}

export function generateStaticParams() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  return getTags(posts).map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const result = getTagPosts(posts, params.tag);

  if (!result) notFound();

  return {
    title: `Articles tagged #${result.tag.name}`,
    description: `Browse all articles tagged with #${result.tag.name} on Relay Blog.`,
  };
}
