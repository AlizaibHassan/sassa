'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We're sorry, but there was an error loading this page. Our team has been notified.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}