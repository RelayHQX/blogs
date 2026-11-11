import { blogAuthors, blogSource } from '@/lib/source';
import { getPosts, getTags } from '@/lib/blog';
import { BlogBackLink, BlogTitle, BlogDescription, BlogTagCards, BlogEmpty } from '@/components/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags',
  description: 'Browse all articles and topics on Relay Blog.',
};

export default function TagsPage() {
  const posts = getPosts(blogSource.getPages(), blogAuthors);
  const tags = getTags(posts);

  return (
    <div className="mx-auto flex w-full max-w-[850px] flex-col gap-8">
      <div>
        <BlogBackLink href="/blog">Go Back</BlogBackLink>
        <BlogTitle className="mt-6 text-2xl sm:text-3xl font-medium tracking-tight">
          All Topics & Tags
        </BlogTitle>
        <BlogDescription className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Browse articles grouped by subject matter and categories.
        </BlogDescription>
      </div>

      {tags.length > 0 ? (
        <BlogTagCards tags={tags} />
      ) : (
        <BlogEmpty title="No tags found" description="No tags or categories have been created yet." />
      )}
    </div>
  );
}
