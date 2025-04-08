const WP_DOMAIN = 'sassa.web.za';
const NEXT_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000';

// Create a set of all known page routes for quick lookup
const pageRoutes = new Set([
  '/check',
  '/payment-dates',
  '/sassa-loan-calculator',
  '/balance-check',
  '/change-banking-details',
  '/check-verification',
  '/about-us',
  '/contact-us',
  '/terms-of-service',
  '/disclaimer',
  '/privacy-policy',
  '/blog', // Latest News route
]);

/**
 * Convert a WordPress URL to an internal Next.js route
 */
export function wpUrlToNextRoute(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // If it's not our WordPress domain, return original URL
    if (!urlObj.hostname.includes(WP_DOMAIN)) {
      return url;
    }

    // Extract path and remove trailing slash
    let path = urlObj.pathname.replace(/\/$/, '');
    
    // Convert WordPress paths to Next.js routes
    if (path.match(/^\/\d{4}\/\d{2}\//)) {
      // Convert dated blog posts to /blog/slug
      const slug = path.split('/').pop();
      return `/blog/${slug}`;
    }

    // Handle page routes with proper formatting
    const cleanPath = path
      .replace(/^\/pages/, '')    // Remove WordPress /pages prefix
      .replace(/^\/+|\/+$/g, ''); // Trim leading/trailing slashes
    
    // Get the final path
    const finalPath = cleanPath ? `/${cleanPath}` : '/';
    
    // If it's a known page route or homepage, return as is
    if (pageRoutes.has(finalPath)) {
      return finalPath;
    }
    
    // For all other paths, prefix with /blog/
    return `/blog${finalPath}`;
  } catch (e) {
    // If URL parsing fails, return original
    return url;
  }
}

/**
 * Process HTML content to rewrite internal links
 */
export function processInternalLinks(content: string): string {
  // Replace all href attributes that point to our WordPress domain
  return content.replace(
    /href="(https?:\/\/[^"]*?)"/g,
    (match, url) => `href="${wpUrlToNextRoute(url)}"`
  );
}
