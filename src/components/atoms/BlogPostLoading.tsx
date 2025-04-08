'use client';

export default function BlogPostLoading() {
  return (
    <div className="blog-loading-item animate-pulse">
      <div className="w-full h-64 bg-gray-200 rounded-lg" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

export function BlogPostLoadingGrid() {
  return (
    <div className="space-y-12">
      <div className="blog-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <BlogPostLoading key={i} />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-10 h-10 bg-yellow-200 rounded-lg animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}