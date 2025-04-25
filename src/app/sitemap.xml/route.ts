import { generateSitemapEntries, generateSitemapXml } from '@/utils/sitemap';

export async function GET() {
  try {
    const entries = await generateSitemapEntries();
    const sitemap = generateSitemapXml(entries);
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
