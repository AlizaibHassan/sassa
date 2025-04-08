'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate, sanitizeExcerpt } from '@/utils/wordpress';
import { processInternalLinks } from '@/utils/internalLinks';
import type { WPPost } from '@/utils/wordpress';

interface BlogPostCardProps {
  post: WPPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {featuredImage ? (
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 
          className="mb-2 text-xl font-bold text-gray-900 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div 
          className="mb-4 text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: sanitizeExcerpt(post.excerpt.rendered)
          }}
        />

        <div className="mt-auto flex items-center gap-4">
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar_urls['48'] && (
                <Image
                  src={author.avatar_urls['48']}
                  alt={author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-gray-600">{author.name}</span>
            </div>
          )}
          <time className="ml-auto text-sm text-gray-500">
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </Link>
  );
}