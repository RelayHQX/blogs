import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { generateOGImage } from 'fumadocs-ui/og';
import { appName, getPageImageUrl } from '@/lib/shared';

export const revalidate = false;

export async function GET(_req: Request, props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params;
  const page = blogSource.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: appName,
  });
}

export function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: getPageImageUrl(page).segments,
  }));
}
