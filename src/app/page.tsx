import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { getPageById } from '@/utils/wordpress';

// Generate metadata from WordPress page content
export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageById(22);

  const title = pageContent?.title?.rendered
    ? pageContent.title.rendered.replace(/&amp;/g, '&')
    : 'SASSA Status Check / SRD Status Check R370 Payment Dates';

  // Extract description from content if available
// Extract description from excerpt if available
const description = pageContent?.excerpt?.rendered
  ? pageContent.excerpt.rendered
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
    .replace(/&amp;/g, '&') // Replace HTML entities
    .substring(0, 160) // Limit to 160 characters
    .trim() // Trim whitespace
  : 'Check your SASSA SRD R350 grant status for April 2025. Get instant access to your Social Relief of Distress (SRD) grant application status.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'SASSA Services',
      url: 'https://www.sassaservices.com/status-check', // Add the URL of the page
      images: [
        {
          url: 'https://www.sassaservices.com/images/sassa-status-check.jpg', // Add an image URL
          width: 1200,
          height: 630,
          alt: 'SASSA Status Check',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@SASSAServices', // Add your Twitter handle
      creator: '@SASSAServices', // Add your Twitter handle
      images: ['https://www.sassaservices.com/images/sassa-status-check.jpg'], // Add an image URL
    },
  };
}

export default async function Home() {
  // Fetch page content for ID 22
  const pageContent = await getPageById(22);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-50 to-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              SASSA Status Check
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Check your SRD R350 grant application status for April 2025. Get instant access to your payment information.
            </p>
          </div>
        </div>
        
      </section>

      {/* Page Content */}
      {pageContent && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />
            </div>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-yellow-500" />
                Payment Dates
              </h2>
              <p className="text-gray-600 mb-4">
                View the latest SASSA payment dates for April 2025 and plan ahead.
              </p>
              <Link href="/payment-dates" className="text-yellow-600 hover:text-yellow-700 inline-flex items-center gap-1">
                View Schedule <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-500" />
                Application Status
              </h2>
              <p className="text-gray-600 mb-4">
                Track your SRD grant application status and payment progress.
              </p>
              <Link href="/check-verification" className="text-yellow-600 hover:text-yellow-700 inline-flex items-center gap-1">
                Check Status <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <RefreshCw className="text-yellow-500" />
                Latest Updates
              </h2>
              <p className="text-gray-600 mb-4">
                Stay informed about recent changes and announcements.
              </p>
              <Link href="/blog" className="text-yellow-600 hover:text-yellow-700 inline-flex items-center gap-1">
                Read Updates <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Important Information
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                The SASSA R350 grant (Social Relief of Distress Grant) is currently available for the
                2024/25 financial year. Here are the key points you need to know:
              </p>
              <ul>
                <li>Check your status regularly through the official SASSA website</li>
                <li>Keep your contact details updated for payment notifications</li>
                <li>Ensure your banking details are correct and verified</li>
                <li>Monitor official SASSA channels for important announcements</li>
              </ul>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/check"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Status Now
          </Link>
          <Link
            href="/payment-dates"
            className="inline-flex items-center justify-center px-6 py-3 border border-yellow-500 text-base font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Payment Dates
          </Link>
        </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  April 2025 Updates
                </h3>
                <p className="text-gray-700">
                  Payment dates are determined by the last three digits of your ID number.
                  Visit our payment dates page for the complete schedule.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mt-4"
                >
                  View Latest Updates <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
