import { WPPost, WPPage } from './wordpress';

export function generateBlogPostSchema(post: WPPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title.rendered.replace(/&amp;/g, '&'),
    description: post.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .substring(0, 160),
    datePublished: post.date,
    dateModified: post.modified,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    author: {
      '@type': 'Person',
      name: post._embedded?.author?.[0]?.name || 'SASSA Services',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SASSA Services',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sassa.web.za/logo.png', // Update with actual logo URL
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sassa.web.za/blog/${post.slug}`,
    },
  };
}

export function generatePageSchema(page: WPPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title.rendered.replace(/&amp;/g, '&'),
    description: page.content.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .substring(0, 160),
    dateModified: page.modified,
    image: page._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    publisher: {
      '@type': 'Organization',
      name: 'SASSA Services',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sassa.web.za/logo.png', // Update with actual logo URL
      },
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SASSA Services',
    alternateName: 'South African Social Security Agency Services',
    url: 'https://sassa.web.za',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sassa.web.za/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'SASSA Services',
    alternateName: 'South African Social Security Agency Services',
    url: 'https://sassa.web.za',
    logo: 'https://sassa.web.za/logo.png', // Update with actual logo URL
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-80-060-1011',
      contactType: 'customer service',
      areaServed: 'ZA',
      availableLanguage: ['en', 'zu', 'xh', 'af', 'st', 'tn', 'nso'],
    },
    sameAs: [
      'https://www.facebook.com/OfficialSASSA/',
      'https://twitter.com/OfficialSASSA',
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://sassa.web.za${item.url}`,
    })),
  };
}