export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Placeholder */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg mx-auto mb-4" />
            <div className="h-6 w-2/3 bg-gray-200 rounded-lg mx-auto" />
          </div>

          {/* Items Placeholder */}
          <div className="grid gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm animate-pulse 
                  flex items-center justify-between"
              >
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-5 w-5 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}