export default function PageLoading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          {/* Title placeholder */}
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-6" />

          {/* Featured image placeholder */}
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8 bg-gray-200" />
        </div>

        {/* Content placeholder */}
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Paragraph placeholders */}
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          ))}

          {/* Call to action placeholder */}
          <div className="flex justify-center py-8">
            <div className="h-12 bg-gray-200 rounded-lg w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}