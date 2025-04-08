'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { WPPage } from '@/utils/wordpress';
import { generateBreadcrumbSchema } from '@/utils/schema';
import Script from 'next/script';
import { Share2 } from 'lucide-react';
import { usePageTransition } from '@/hooks/usePageTransition';

interface PageContentProps {
  page: WPPage;
}

export default function PageContent({ page }: PageContentProps) {
  const [mounted, setMounted] = useState(false);
  const { isLoading } = usePageTransition();
  const featuredImage = page._embedded?.['wp:featuredmedia']?.[0];
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const shareContent = async () => {
    if (!navigator.share) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      return;
    }

    try {
      await navigator.share({
        title: page.title.rendered,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  // Extract breadcrumb items from URL
  const pathSegments = typeof window !== 'undefined' ? 
    window.location.pathname.split('/').filter(Boolean) : [];
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    ...pathSegments.map((segment, index) => ({
      name: segment === 'pages' ? 'Information' : 
        segment === page.slug ? page.title.rendered : 
        segment,
      url: '/' + pathSegments.slice(0, index + 1).join('/'),
    })),
  ];

  return (
    <article className={`min-h-[calc(100vh-16rem)] transition-opacity duration-300 ${
      isLoading ? 'opacity-50' : 'opacity-100'
    }`}>
      {/* Schema.org JSON-LD */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />

      {/* Hero Section */}
      <div className="relative bg-gray-900">
        {featuredImage ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || page.title.rendered}
                fill
                className="object-cover opacity-30"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900" />
            </div>
            <div className="relative">
              <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 
                    className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-fade-in"
                    dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 
                className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center animate-fade-in"
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          {mounted && (
            <nav className="text-sm mb-8" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((item, index) => (
                  <li key={item.url} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span 
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ 
                          __html: item.name.replace(/&amp;/g, '&') 
                        }}
                      />
                    ) : (
                      <a 
                        href={item.url}
                        className="text-yellow-600 hover:text-yellow-700"
                        dangerouslySetInnerHTML={{ 
                          __html: item.name.replace(/&amp;/g, '&') 
                        }}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Main Content */}
          <div 
            className={`prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 
              prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:text-yellow-700
              prose-strong:text-gray-900 prose-img:rounded-xl transition-opacity duration-300
              ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />

          {/* Share Button */}
          {mounted && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={shareContent}
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl
                  hover:bg-yellow-600 transition-all duration-300 hover:scale-105
                  active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Share2 size={20} />
                Share This Page
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}