import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  // Helper function to generate page link
  const getPageLink = (page: number) => 
    `${basePath}${page === 1 ? '' : `?page=${page}`}`;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side
    const pages: (number | string)[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        i === currentPage || // Current page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - delta - 1 && currentPage - delta > 2) || // Ellipsis before
        (i === currentPage + delta + 1 && currentPage + delta < totalPages - 1) // Ellipsis after
      ) {
        pages.push('...');
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 my-6" aria-label="Pagination">
      {/* Previous Page */}
      <Link
        href={getPageLink(currentPage - 1)}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed pointer-events-none'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        return (
          <Link
            key={pageNum}
            href={getPageLink(pageNum)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === pageNum
                ? 'bg-yellow-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next Page */}
      <Link
        href={getPageLink(currentPage + 1)}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed pointer-events-none'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}