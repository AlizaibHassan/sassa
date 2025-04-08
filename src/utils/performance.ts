import { cache } from 'react';
import { WPPost, WPPage } from './wordpress';

export const CACHE_TAGS = {
  posts: 'posts',
  pages: 'pages',
  status: 'status',
} as const;

// React cache for data fetching
export const getCachedPosts = cache(async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sassa.web.za/wp-json/wp/v2'; // Fallback to default if not set
  const response = await fetch(
    `${apiUrl}/posts?_embed=wp:featuredmedia,author&per_page=100`,
    {
      next: { 
        tags: [CACHE_TAGS.posts],
        revalidate: 3600  // Revalidate every hour
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json() as Promise<WPPost[]>;
});

export const getCachedPages = cache(async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sassa.web.za/wp-json/wp/v2'; // Fallback to default if not set
  const response = await fetch(
    `${apiUrl}/pages?_embed=wp:featuredmedia&per_page=100`,
    {
      next: { 
        tags: [CACHE_TAGS.pages],
        revalidate: 3600  // Revalidate every hour
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch pages');
  }
  
  return response.json() as Promise<WPPage[]>;
});

// Image optimization utilities
export function getImageSizes(width: number) {
  return {
    mobile: Math.min(width, 640),
    tablet: Math.min(width, 1024),
    desktop: Math.min(width, 1920),
  };
}

export function generateImgSrcSet(url: string, maxWidth: number = 1920) {
  const sizes = getImageSizes(maxWidth);
  const baseUrl = new URL(url);
  
  return Object.entries(sizes)
    .map(([size, width]) => {
      baseUrl.searchParams.set('w', width.toString());
      return `${baseUrl.toString()} ${width}w`;
    })
    .join(', ');
}

// Performance monitoring
export function reportWebVitals(metric: any) {
  const { id, name, label, value, startTime, attribution } = metric;
  
  // Example: Send to analytics
  console.log({
    metricId: id,
    metricName: name,
    metricLabel: label,
    metricValue: Math.round(name === 'CLS' ? value * 1000 : value),
    metricStartTime: startTime,
    pageUrl: window.location.pathname,
    attribution,
  });
}

// Prefetching
export function prefetchPages(slugs: string[]) {
  slugs.forEach(slug => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/${slug}`;
    document.head.appendChild(link);
  });
}

// Resource hints
export function addResourceHints() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://sassa.web.za'; // Fallback to default if not set
  const hints = [
    {
      rel: 'preconnect',
      href: domain,
    },
    {
      rel: 'dns-prefetch',
      href: domain,
    },
    {
      rel: 'preload',
      href: '/fonts/your-main-font.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ];

  hints.forEach(({ rel, href, ...rest }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        link.setAttribute(key, value);
      }
    });
    document.head.appendChild(link);
  });
}

// Service Worker registration
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful');
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
      return null;
    }
  }
  return null;
}
