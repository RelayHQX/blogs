import { blogLlms } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  return new Response(await blogLlms.full(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
