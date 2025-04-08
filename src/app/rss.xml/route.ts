import { getAllPosts } from '@/utils/wordpress';
import { generateRssFeed } from '@/utils/sitemap';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const rssFeed = generateRssFeed(posts);

    return new Response(rssFeed, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}