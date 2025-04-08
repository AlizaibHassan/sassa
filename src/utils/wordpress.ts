import { processInternalLinks } from './internalLinks';

const API_URL = process.env.API_URL as string;

export interface WPPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
  };
}

export interface WPPage {
  excerpt: any;
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  modified: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface WPPaginatedResponse<T> {
  items: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

async function getPaginatedPosts(page: number = 1, perPage: number = 9): Promise<WPPaginatedResponse<WPPost>> {
  try {
    const countResponse = await fetch(
      `${API_URL}/posts?per_page=1`,
      { 
        next: { revalidate: 3600 },
        method: 'HEAD'
      }
    );

    if (!countResponse.ok) {
      throw new Error('Failed to fetch post count');
    }

    const total = parseInt(countResponse.headers.get('x-wp-total') || '0', 10);
    const totalPages = Math.ceil(total / perPage);

    if (page > totalPages) {
      return {
        items: [],
        total,
        totalPages,
        currentPage: Math.min(page, Math.max(1, totalPages))
      };
    }

    const postsResponse = await fetch(
      `${API_URL}/posts?_embed=wp:featuredmedia,author&per_page=${perPage}&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!postsResponse.ok) {
      throw new Error('Failed to fetch posts');
    }

    const items = await postsResponse.json();

    return {
      items,
      total,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const response = await fetch(
      `${API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia,author`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error('Failed to fetch post');
    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

async function getAllPosts(): Promise<WPPost[]> {
  try {
    const { items } = await getPaginatedPosts(1, 100);
    return items;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

async function getAllPages(): Promise<WPPage[]> {
  try {
    const response = await fetch(
      `${API_URL}/pages?_embed=wp:featuredmedia&per_page=100`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error('Failed to fetch pages');
    const pages = await response.json();
    return pages.filter((page: WPPage) => page.slug !== 'home');
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

async function getPageById(id: number): Promise<WPPage | null> {
  try {
    const response = await fetch(
      `${API_URL}/pages/${id}?_embed`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error('Failed to fetch page');
    const data = await response.json();
    if (data.content?.rendered) {
      data.content.rendered = processInternalLinks(data.content.rendered);
    }
    return data;
  } catch (error) {
    console.error(`Error fetching page with ID ${id}:`, error);
    return null;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function sanitizeExcerpt(excerpt: string): string {
  return excerpt
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\[&hellip;\]/g, '...')
    .trim();
}

export {
  getPaginatedPosts,
  getPostBySlug,
  getAllPosts,
  getAllPages,
  getPageById,
  formatDate,
  sanitizeExcerpt,
};
