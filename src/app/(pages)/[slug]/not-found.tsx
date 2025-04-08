import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the SASSA information page you're looking for. 
          It might have been moved or removed. Please check our main sections below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-xl text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Return Home
          </Link>
          <Link
            href="/sassa-status-check"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-yellow-600 bg-yellow-50 hover:bg-yellow-100 transition-colors"
          >
            Check SASSA Status
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Popular Pages
          </h2>
          <div className="flex flex-col gap-3">
            <Link 
              href="/sassa-payment-dates-for-2025"
              className="text-yellow-600 hover:text-yellow-700"
            >
              Payment Dates 2025
            </Link>
            <Link 
              href="/balance-check-sassa"
              className="text-yellow-600 hover:text-yellow-700"
            >
              Check Balance
            </Link>
            <Link 
              href="/blog"
              className="text-yellow-600 hover:text-yellow-700"
            >
              Latest Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}