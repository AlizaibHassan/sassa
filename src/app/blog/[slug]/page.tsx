import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getPostBySlug, formatDate, getAllPosts } from '@/utils/wordpress';
import { processInternalLinks } from '@/utils/internalLinks';
import { notFound } from 'next/navigation';
import { blogPostMetadata } from '../metadata';
import '../styles.css';

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: any){
  const slug = await params.slug;
  const post = await getPostBySlug(slug);
  // const post = await getPostBySlug(params.slug);

  if (!post) {
    return blogPostMetadata;
  }

  const title = post.title.rendered.replace(/&amp;/g, '&');
  const excerpt = post.excerpt.rendered
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&amp;/g, '&')
    .substring(0, 160);

  return {
    title: `${title} - SASSA Blog`,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
        ? [{ url: post._embedded['wp:featuredmedia'][0].source_url }]
        : [],
    },
  };
}

export default async function BlogPost({ params }: any) {
  const slug = await params.slug;
  const post = await getPostBySlug(slug);
  // const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];

  return (
    <article className="blog-post">
      {/* Hero Section */}
      <div className="blog-post-hero">
        {featuredImage && (
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="blog-post-hero-image"
            priority
            sizes="100vw"
          />
        )}
        <div className="blog-post-hero-overlay" />

        <div className="blog-post-hero-content">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog" className="blog-post-back-link">
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>

            <h1
              className="blog-post-title"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="blog-post-meta">
              {author && (
                <div className="blog-post-author">
                  <User size={20} />
                  <span>{author.name}</span>
                </div>
              )}
              <div className="blog-post-date">
                <Calendar size={20} />
                <time>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="blog-post-content">
        <div
          className="blog-post-body"
          dangerouslySetInnerHTML={{
            __html: processInternalLinks(post.content.rendered)
          }}
        />
      </div>
    </article>
  );
}
