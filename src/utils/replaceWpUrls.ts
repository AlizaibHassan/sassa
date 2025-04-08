// utils/replaceWpUrls.ts
const WP_DOMAIN = 'sassa.web.za';
export function replaceWpUrls(html: string): string {
   
    const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || 'localhost:300/blog'; // ← your site URL
  
    return html.replace(new RegExp(WP_DOMAIN, 'g'), FRONTEND_URL);
  }
  