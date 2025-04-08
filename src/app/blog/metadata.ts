import { Metadata } from 'next';

export const blogMetadata: Metadata = {
  title: {
    default: 'SASSA Blog - Latest News and Updates',
    template: '%s | SASSA Blog'
  },
  description: 'Stay informed about SASSA news, grant updates, payment dates, and important announcements for South African Social Security Agency services.',
  openGraph: {
    type: 'website',
    siteName: 'SASSA Services',
    title: 'SASSA Blog - Latest News and Updates',
    description: 'Stay informed about SASSA news, grant updates, payment dates, and important announcements.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OfficialSASSA',
    creator: '@OfficialSASSA',
  },
};

export const blogPostMetadata: Metadata = {
  title: 'SASSA Blog Post',
  description: 'Read the latest news and updates about SASSA services, grants, and payments.',
  openGraph: {
    type: 'article',
    siteName: 'SASSA Services',
    locale: 'en_ZA',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};