import { BlogPostLoadingGrid } from '@/components/atoms/BlogPostLoading';

export default function BlogsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Loading State */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 w-3/4 md:w-1/2 bg-gray-200 rounded-lg mx-auto mb-4" />
          <div className="h-6 w-2/3 md:w-1/3 bg-gray-200 rounded-lg mx-auto" />
        </div>

        {/* Posts Grid Loading State */}
        <BlogPostLoadingGrid />
      </div>
    </div>
  );
}