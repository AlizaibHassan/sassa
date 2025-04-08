import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/components/atoms/PageContent';
import { getPageById } from '@/utils/wordpress';

const getPageIdBySlug = (slug: string): number | undefined => {
  const slugToIdMap: Record<string, number> = {
    'privacy-policy': 3,
    'check': 22,
    'about-us': 132,
    'contact-us': 726,
    'terms-of-service': 729,
    'payment-dates': 744,
    'sassa-loan-calculator': 770,
    'disclaimer': 1031,
    'check-verification': 1181,
    'balance-check': 1196,
    'change-banking-details': 1209
  };
  return slugToIdMap[slug];
};

export async function generateMetadata({ params }: any) {

  const slug = await params.slug;

  const pageId = getPageIdBySlug(slug);
  if (!pageId) {
    return {
      title: 'Page Not Found - SASSA',
      description: 'The requested page could not be found.',
    };
  }

  const page = await getPageById(pageId);
  if (!page) {
    return {
      title: 'Page Not Found - SASSA',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: `${page.title.rendered} - SASSA`,
    description: page.content.rendered
      .replace(/<\/?[^>]+(>|$)/g, '')
      .substring(0, 160),
  };
}

export default async function Page({ params }: any) {
  const slug = await params.slug;

  const pageId = getPageIdBySlug(slug);
  // const pageId = getPageIdBySlug(params.slug);

  if (!pageId) {
    notFound();
  }

  const page = await getPageById(pageId);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageContent page={page} />
    </div>
  );
}
