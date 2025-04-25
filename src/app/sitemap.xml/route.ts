import { generateSitemapEntries, generateSitemapXml } from '@/utils/sitemap';

export async function GET() {
  try {
    const entries = await generateSitemapEntries();
    const sitemapXml = generateSitemapXml(entries);

    return new Response(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
