
export default function PagesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Placeholder */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg mx-auto mb-4" />
            <div className="h-6 w-2/3 bg-gray-200 rounded-lg mx-auto" />
          </div>

          {/* Sections Placeholder */}
          <div className="grid gap-8">
            {[...Array(4)].map((_, groupIndex) => (
              <div 
                key={groupIndex}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Section Header */}
                <div className="p-6 bg-gray-200 animate-pulse">
                  <div className="h-8 w-1/3 bg-gray-300 rounded" />
                </div>

                {/* Section Items */}
                <div className="divide-y divide-gray-100">
                  {[...Array(3)].map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="p-6 animate-pulse flex justify-between items-center"
                    >
                      <div className="h-6 w-3/4 bg-gray-200 rounded" />
                      <div className="h-6 w-6 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}