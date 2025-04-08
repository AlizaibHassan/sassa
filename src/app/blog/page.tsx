import { getPaginatedPosts } from '@/utils/wordpress';
import BlogPostCard from '@/components/atoms/BlogPostCard';
import { BlogPostLoadingGrid } from '@/components/atoms/BlogPostLoading';
import { Suspense } from 'react';
import { blogMetadata } from './metadata';
import Pagination from '@/components/atoms/Pagination';
import { redirect } from 'next/navigation';
import './styles.css';

export const metadata = blogMetadata;

function validatePage(page: number): number {
  return Math.max(1, Math.floor(page));
}

async function BlogPosts({
  page = 1,
  perPage = 9
}: {
  page?: number;
  perPage?: number;
}) {
  const { items: posts, totalPages, currentPage } = await getPaginatedPosts(page, perPage);

  // Redirect to first page if:
  // 1. No posts found and we're not on page 1
  // 2. Requested page is beyond total pages
  if ((!posts.length && page > 1) || page > totalPages) {
    redirect('/blog');
  }

  // No posts exist yet
  if (!posts.length) {
    return (
      <div className="blog-empty">
        <h2 className="blog-empty-title">No Posts Yet</h2>
        <p className="blog-empty-message">
          We're working on creating great content for you. Please check back soon for the latest SASSA news and updates.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
      )}
    </>
  );
}

export default async function BlogsPage({
  searchParams,
}: any) {
  const page = await searchParams?.page || 1;
  const pageParam = await Number(page);
  const validatedPage = validatePage(pageParam);

  // Redirect if invalid page number was provided
  if (pageParam !== validatedPage) {
    redirect(`/blog${validatedPage === 1 ? '' : `?page=${validatedPage}`}`);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="blog-hero">
          <h1 className="blog-hero-title">
            Latest SASSA News & Updates
          </h1>
          <p className="blog-hero-description">
            Stay informed about SASSA grants, payment dates, and important announcements.
          </p>
        </div>

        <Suspense fallback={<BlogPostLoadingGrid />}>
          <BlogPosts page={validatedPage} />
        </Suspense>
      </div>
    </div>
  );
}