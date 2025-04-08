import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Post Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The blog post you're looking for doesn't exist or may have been removed.
        </p>
        <Link 
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  );
}