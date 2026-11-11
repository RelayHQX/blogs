import { getAtom, getBaseUrl } from '@/lib/rss';

export const dynamic = 'force-dynamic';

export function GET(req: Request) {
  const baseUrl = getBaseUrl(req);
  const xml = getAtom(baseUrl);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
