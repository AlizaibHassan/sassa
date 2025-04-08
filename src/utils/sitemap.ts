import { getAllPosts, getAllPages } from './wordpress';

export async function generateSitemapEntries() {
  try {
    const [posts, pages] = await Promise.all([
      getAllPosts(),
      getAllPages(),
    ]);

    // Static routes
    const staticRoutes = [
      {
        url: '/',
        lastMod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        url: '/blog',
        lastMod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      },
    ];

    // Blog post routes
    const postRoutes = posts.map(post => ({
      url: `/blog/${post.slug}`,
      lastMod: post.modified,
      changefreq: 'weekly',
      priority: 0.8,
    }));

    // Page routes
    const pageRoutes = pages.map(page => ({
      url: `/pages/${page.slug}`,
      lastMod: page.modified,
      changefreq: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes, ...pageRoutes];
  } catch (error) {
    console.error('Error generating sitemap entries:', error);
    return [];
  }
}

export function generateSitemapXml(entries: any[]) {
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

export function generateRssFeed(posts: any[]) {
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