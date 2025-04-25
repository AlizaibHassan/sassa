import { getAllPosts, getAllPages } from './wordpress';

type SitemapEntry = {
  url: string;
  lastMod: string;
  changefreq: string;
  priority: number;
};

// ✅ Format date to valid ISO 8601 format without milliseconds
function formatToValidDate(date: string | Date | undefined | null): string {
  const d = new Date(date ?? Date.now());

  // fallback for invalid dates
  if (isNaN(d.getTime())) {
    console.warn('Invalid date found in sitemap generation:', date);
    return new Date().toISOString().split('T')[0]; // e.g., "2025-04-25"
  }

  return d.toISOString().split('.')[0] + 'Z'; // e.g., "2025-04-25T12:32:13Z"
}

export async function generateSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    const [posts, pages] = await Promise.all([
      getAllPosts(),
      getAllPages(),
    ]);

    // Static routes
    const staticRoutes: SitemapEntry[] = [
      {
        url: '/',
        lastMod: formatToValidDate(new Date()),
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        url: '/blog',
        lastMod: formatToValidDate(new Date()),
        changefreq: 'daily',
        priority: 0.9,
      },
    ];

    // Blog post routes
    const postRoutes: SitemapEntry[] = posts.map(post => ({
      url: `/blog/${post.slug}`,
      lastMod: formatToValidDate(post.modified),
      changefreq: 'weekly',
      priority: 0.8,
    }));

    // Page routes
    const pageRoutes: SitemapEntry[] = pages.map(page => ({
      url: `/pages/${page.slug}`,
      lastMod: formatToValidDate(page.modified),
      changefreq: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes, ...pageRoutes];
  } catch (error) {
    console.error('Error generating sitemap entries:', error);
    return [];
  }
}

export function generateSitemapXml(entries: SitemapEntry[]): string {
  const xmlItems = entries.map(entry => `
    <url>
      <loc>https://sassa.web.za${entry.url}</loc>
      <lastmod>${entry.lastMod}</lastmod>
      <changefreq>${entry.changefreq}</changefreq>
      <priority>${entry.priority}</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;
}

export function generateRssFeed(posts: any[]): string {
  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title.rendered}]]></title>
      <link>https://sassa.web.za/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>https://sassa.web.za/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt.rendered}]]></description>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SASSA Services Blog</title>
    <link>https://sassa.web.za</link>
    <description>Latest news and updates about SASSA services, grants, and payments</description>
    <language>en-ZA</language>
    <atom:link href="https://sassa.web.za/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
}
