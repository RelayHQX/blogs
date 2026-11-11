import { notFound } from 'next/navigation';
import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTagPosts, getTags } from '@/lib/blog';
import { BlogBackLink, BlogTitle, BlogDescription, BlogCards, BlogEmpty } from '@/components/blog';
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
          <BlogBackLink href="/blog/tags">All Tags</BlogBackLink>
          <span className="text-xs text-neutral-400">/</span>
          <Link
            href="/blog"
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
        </div>
        <BlogTitle className="mt-6 text-2xl sm:text-3xl font-medium tracking-tight">
          #{result.tag.name}
        </BlogTitle>
        <BlogDescription className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Showing {result.posts.length} {result.posts.length === 1 ? 'article' : 'articles'} filed under #{result.tag.name}.
        </BlogDescription>
      </div>

      {result.posts.length > 0 ? (
        <BlogCards posts={result.posts} />
      ) : (
        <BlogEmpty
          title={`No articles tagged #${result.tag.name}`}
          description="Check back soon for new articles in this category."
        />
      )}
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
