export default function BlogPostLoading() {
  return (
    <article className="blog-post">
      {/* Hero Section */}
      <div className="blog-post-hero">
        <div className="blog-post-hero-overlay" />
        
        <div className="blog-post-hero-content">
          <div className="container mx-auto max-w-4xl">
            {/* Back button placeholder */}
            <div className="h-8 w-32 bg-gray-300/20 rounded mb-6 animate-pulse" />
            
            {/* Title placeholder */}
            <div className="space-y-4 mb-6">
              <div className="h-8 w-3/4 bg-gray-300/20 rounded animate-pulse" />
              <div className="h-8 w-1/2 bg-gray-300/20 rounded animate-pulse" />
            </div>

            {/* Meta info placeholder */}
            <div className="flex flex-wrap gap-6">
              <div className="h-6 w-32 bg-gray-300/20 rounded animate-pulse" />
              <div className="h-6 w-32 bg-gray-300/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="blog-post-content">
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}