import { Metadata } from 'next';
import { getAllPages } from '@/utils/wordpress';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SASSA Information Pages',
  description: 'Access important SASSA information pages including grant eligibility, payment dates, and more.',
};

interface PageGroup {
  title: string;
  pages: {
    id: number;
    title: string;
    slug: string;
  }[];
}

function groupPages(pages: any[]) {
  const groups: Record<string, any[]> = {
    'Grant Services': [],
    'Payment Information': [],
    'Legal & Support': [],
    'Other Services': [],
  };

  pages.forEach(page => {
    const title = page.title.rendered.toLowerCase();
    if (title.includes('grant') || title.includes('eligibility')) {
      groups['Grant Services'].push(page);
    } else if (title.includes('payment') || title.includes('date')) {
      groups['Payment Information'].push(page);
    } else if (title.includes('terms') || title.includes('contact') || title.includes('about')) {
      groups['Legal & Support'].push(page);
    } else {
      groups['Other Services'].push(page);
    }
  });

  return Object.entries(groups)
    .filter(([_, pages]) => pages.length > 0)
    .map(([title, pages]) => ({ title, pages }));
}

export default async function PagesIndex() {
  const pages = await getAllPages();
  const groupedPages = await groupPages(pages);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SASSA Information Pages
            </h1>
            <p className="text-xl text-gray-600">
              Find detailed information about SASSA services, grants, and more.
            </p>
          </header>

          <div className="grid gap-8">
            {groupedPages.map((group, index) => (
              <section 
                key={group.title}
                className="bg-white rounded-2xl shadow-sm overflow-hidden
                  transform transition-all duration-300 hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-white p-6 bg-yellow-500">
                  {group.title}
                </h2>
                <div className="divide-y divide-gray-100">
                  {group.pages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/${page.slug}`}
                      className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                    >
                      <span 
                        className="text-lg text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: page.title.rendered
                        }}
                      />
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}