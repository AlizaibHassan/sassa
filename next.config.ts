/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sassa.web.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asdjlk.sassa.web.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.org.uk',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: '/your-financial-calendar-sassa-r350-grant-payment-highlights',
        destination: '/blog/your-financial-calendar-sassa-r350-grant-payment-highlights',
        permanent: true,
      },
      {
        source: '/what-will-the-public-sector-wage-be-in-2024-and-how-much-could-it-increase',
        destination: '/blog/what-will-the-public-sector-wage-be-in-2024-and-how-much-could-it-increase',
        permanent: true,
      },
      {
        source: '/understanding-postbank-cards-in-south-africa',
        destination: '/blog/understanding-postbank-cards-in-south-africa',
        permanent: true,
      },
      {
        source: '/stay-ahead-anticipating-sassa-r350-grant-payment-dates',
        destination: '/blog/stay-ahead-anticipating-sassa-r350-grant-payment-dates',
        permanent: true,
      },
      {
        source: '/status/srd-check',
        destination: '/blog/srd-check',
        permanent: true,
      },
      {
        source: '/status/foster-child-grant',
        destination: '/blog/foster-child-grant',
        permanent: true,
      },
      {
        source: '/status/disability-grant',
        destination: '/blog/disability-grant',
        permanent: true,
      },
      {
        source: '/status/child-support-grant',
        destination: '/blog/child-support-grant',
        permanent: true,
      },
      {
        source: '/social-grants/older-person-grant',
        destination: '/blog/older-person-grant',
        permanent: true,
      },
      {
        source: '/social-grants/foster-child-grant',
        destination: '/blog/foster-child-grant',
        permanent: true,
      },
      {
        source: '/social-grants/disability-grant',
        destination: '/blog/disability-grant',
        permanent: true,
      },
      {
        source: '/social-grants/child-support-grant',
        destination: '/blog/child-support-grant',
        permanent: true,
      },
      {
        source: '/social-grants/care-dependency-grant',
        destination: '/blog/care-dependency-grant',
        permanent: true,
      },
      {
        source: '/social-grants',
        destination: '/blog/social-grants',
        permanent: true,
      },
      {
        source: '/sassa-srd-r350-payment-dates-older-persons-grants-march-2024',
        destination: '/blog/sassa-srd-r350-payment-dates-older-persons-grants-march-2024',
        permanent: true,
      },
      {
        source: '/sassa-srd-r350-payment-dates-older-persons-grants-february-2024',
        destination: '/blog/sassa-srd-r350-payment-dates-older-persons-grants-february-2024',
        permanent: true,
      },
      {
        source: '/sassa-srd-r350-payment-dates-older-childrens-grants-march-2024',
        destination: '/blog/sassa-srd-r350-payment-dates-older-childrens-grants-march-2024',
        permanent: true,
      },
      {
        source: '/sassa-srd-r350-payment-dates-march-2024',
        destination: '/blog/sassa-srd-r350-payment-dates-march-2024',
        permanent: true,
      },
      {
        source: '/sassa-srd-r350-payment-dates-january-2024',
        destination: '/blog/sassa-srd-r350-payment-dates-january-2024',
        permanent: true,
      },
      {
        source: '/sassa-r350-grant-when-will-the-payment-date-arrive',
        destination: '/blog/sassa-r350-grant-when-will-the-payment-date-arrive',
        permanent: true,
      },
      {
        source: '/sassa-pension-dates-how-much-is-old-age-pension-and-who-is-eligible',
        destination: '/blog/sassa-pension-dates-how-much-is-old-age-pension-and-who-is-eligible',
        permanent: true,
      },
      {
        source: '/sassa-payment-schedule-january-2024',
        destination: '/blog/sassa-payment-schedule-january-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-september-2025',
        destination: '/blog/sassa-payment-dates-for-september-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-september-2024',
        destination: '/blog/sassa-payment-dates-for-september-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-september-2023',
        destination: '/blog/sassa-payment-dates-for-september-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-september-2022',
        destination: '/blog/sassa-payment-dates-for-september-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-october-2025',
        destination: '/blog/sassa-payment-dates-for-october-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-october-2024',
        destination: '/blog/sassa-payment-dates-for-october-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-october-2023',
        destination: '/blog/sassa-payment-dates-for-october-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-october-2022',
        destination: '/blog/sassa-payment-dates-for-october-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-october-2021',
        destination: '/blog/sassa-payment-dates-for-october-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-november-2025',
        destination: '/blog/sassa-payment-dates-for-november-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-november-2024',
        destination: '/blog/sassa-payment-dates-for-november-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-november-2023',
        destination: '/blog/sassa-payment-dates-for-november-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-november-2022',
        destination: '/blog/sassa-payment-dates-for-november-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-november-2021',
        destination: '/blog/sassa-payment-dates-for-november-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-may-2025',
        destination: '/blog/sassa-payment-dates-for-may-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-may-2024',
        destination: '/blog/sassa-payment-dates-for-may-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-may-2023',
        destination: '/blog/sassa-payment-dates-for-may-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-may-2022',
        destination: '/blog/sassa-payment-dates-for-may-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-may-2021',
        destination: '/blog/sassa-payment-dates-for-may-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-march-2025',
        destination: '/blog/sassa-payment-dates-for-march-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-march-2024',
        destination: '/blog/sassa-payment-dates-for-march-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-march-2023',
        destination: '/blog/sassa-payment-dates-for-march-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-march-2022',
        destination: '/blog/sassa-payment-dates-for-march-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-march-2021',
        destination: '/blog/sassa-payment-dates-for-march-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-june-2025',
        destination: '/blog/sassa-payment-dates-for-june-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-june-2023',
        destination: '/blog/sassa-payment-dates-for-june-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-june-2022',
        destination: '/blog/sassa-payment-dates-for-june-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-june-2021',
        destination: '/blog/sassa-payment-dates-for-june-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-july-2024',
        destination: '/blog/sassa-payment-dates-for-july-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-july-2023',
        destination: '/blog/sassa-payment-dates-for-july-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-july-2021',
        destination: '/blog/sassa-payment-dates-for-july-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-january-2025',
        destination: '/blog/sassa-payment-dates-for-january-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-january-2024',
        destination: '/blog/sassa-payment-dates-for-january-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-january-2022',
        destination: '/blog/sassa-payment-dates-for-january-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-january-2021',
        destination: '/blog/sassa-payment-dates-for-january-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-february-2025',
        destination: '/blog/sassa-payment-dates-for-february-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-february-2024',
        destination: '/blog/sassa-payment-dates-for-february-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-february-2023',
        destination: '/blog/sassa-payment-dates-for-february-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-february-2022',
        destination: '/blog/sassa-payment-dates-for-february-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-february-2021',
        destination: '/blog/sassa-payment-dates-for-february-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-december-2025',
        destination: '/blog/sassa-payment-dates-for-december-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-december-2024',
        destination: '/blog/sassa-payment-dates-for-december-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-december-2023',
        destination: '/blog/sassa-payment-dates-for-december-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-december-2022',
        destination: '/blog/sassa-payment-dates-for-december-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-december-2021',
        destination: '/blog/sassa-payment-dates-for-december-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-august-2024',
        destination: '/blog/sassa-payment-dates-for-august-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-april-2025',
        destination: '/blog/sassa-payment-dates-for-april-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-april-2024',
        destination: '/blog/sassa-payment-dates-for-april-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-april-2023',
        destination: '/blog/sassa-payment-dates-for-april-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-april-2022',
        destination: '/blog/sassa-payment-dates-for-april-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-april-2021',
        destination: '/blog/sassa-payment-dates-for-april-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2025',
        destination: '/blog/sassa-payment-dates-for-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2024',
        destination: '/blog/sassa-payment-dates-for-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2024-2025',
        destination: '/blog/sassa-payment-dates-for-2024-2025',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2023',
        destination: '/blog/sassa-payment-dates-for-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2023-2024',
        destination: '/blog/sassa-payment-dates-for-2023-2024',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2022',
        destination: '/blog/sassa-payment-dates-for-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2022-2023',
        destination: '/blog/sassa-payment-dates-for-2022-2023',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2021',
        destination: '/blog/sassa-payment-dates-for-2021',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-for-2021-2022',
        destination: '/blog/sassa-payment-dates-for-2021-2022',
        permanent: true,
      },
      {
        source: '/sassa-payment-dates-2024-last-chance-for-child-grant-old-age-grant-and-srd',
        destination: '/blog/sassa-payment-dates-2024-last-chance-for-child-grant-old-age-grant-and-srd',
        permanent: true,
      },
      {
        source: '/sassa-loan-calculator',
        destination: '/blog/sassa-loan-calculator',
        permanent: true,
      },
      {
        source: '/sassa-grant-payment-dates-2024-when-will-i-receive-my-social-grant',
        destination: '/blog/sassa-grant-payment-dates-2024-when-will-i-receive-my-social-grant',
        permanent: true,
      },
      {
        source: '/sassa-grant-increase-will-it-happen-and-how-much-in-2024',
        destination: '/blog/sassa-grant-increase-will-it-happen-and-how-much-in-2024',
        permanent: true,
      },
      {
        source: '/sassa-child-grant-increase-in-2024-what-you-should-expect',
        destination: '/blog/sassa-child-grant-increase-in-2024-what-you-should-expect',
        permanent: true,
      },
      {
        source: '/sassa-change-banking-details-for-srd-r350',
        destination: '/blog/sassa-change-banking-details-for-srd-r350',
        permanent: true,
      },
      {
        source: '/sassa-card-renewal-2024-2024-how-to-renew-dates-eligibility-documents',
        destination: '/blog/sassa-card-renewal-2024-2024-how-to-renew-dates-eligibility-documents',
        permanent: true,
      },
      {
        source: '/predicted-increase-in-sassa-grant-amount-by-2024-news-and-fact-check',
        destination: '/blog/predicted-increase-in-sassa-grant-amount-by-2024-news-and-fact-check',
        permanent: true,
      },
      {
        source: '/opening-hours',
        destination: '/blog/opening-hours',
        permanent: true,
      },
      {
        source: '/new-criteria-for-r350-eligibility-in-2024-treasury-announces-updates',
        destination: '/blog/new-criteria-for-r350-eligibility-in-2024-treasury-announces-updates',
        permanent: true,
      },
      {
        source: '/life/residence-permit',
        destination: '/blog/residence-permit',
        permanent: true,
      },
      {
        source: '/life/nationality',
        destination: '/blog/nationality',
        permanent: true,
      },
      {
        source: '/life/culture/literature',
        destination: '/blog/literature',
        permanent: true,
      },
      {
        source: '/life/culture/architecture',
        destination: '/blog/architecture',
        permanent: true,
      },
      {
        source: '/january-2024-payment-date-for-srd-sassa-r350-grant-for-disability-old-age-and-childrens-grants',
        destination: '/blog/january-2024-payment-date-for-srd-sassa-r350-grant-for-disability-old-age-and-childrens-grants',
        permanent: true,
      },
      {
        source: '/id-holders',
        destination: '/blog/id-holders',
        permanent: true,
      },
      {
        source: '/how-to-update-your-sassa-grant-phone-number-details',
        destination: '/blog/how-to-update-your-sassa-grant-phone-number-details',
        permanent: true,
      },
      {
        source: '/how-to-update-your-bank-details-for-sassa-srd',
        destination: '/blog/how-to-update-your-bank-details-for-sassa-srd',
        permanent: true,
      },
      {
        source: '/how-to-appeal-for-sassa-srd-grant-checking-r350-appeal-status',
        destination: '/blog/how-to-appeal-for-sassa-srd-grant-checking-r350-appeal-status',
        permanent: true,
      },
      {
        source: '/help-my-sassa-r350-was-approved-but-i-didnt-receive-the-payment-what-should-i-do',
        destination: '/blog/help-my-sassa-r350-was-approved-but-i-didnt-receive-the-payment-what-should-i-do',
        permanent: true,
      },
      {
        source: '/eforms',
        destination: '/blog/eforms',
        permanent: true,
      },
      {
        source: '/check-payday',
        destination: '/blog/check-payday',
        permanent: true,
      },
      {
        source: '/check-appeal',
        destination: '/blog/check-appeal',
        permanent: true,
      },
      {
        source: '/alert-sassa-r350-grant-payment-date-changes-explained',
        destination: '/blog/alert-sassa-r350-grant-payment-date-changes-explained',
        permanent: true,
      },
      {
        source: '/2024-south-africa-anticipated-public-sector-wage-hike-what-to-expect',
        destination: '/blog/2024-south-africa-anticipated-public-sector-wage-hike-what-to-expect',
        permanent: true,
      },
      {
        source: '/2024-sassa-status-check-your-r350-srd-grant-and-amount',
        destination: '/blog/2024-sassa-status-check-your-r350-srd-grant-and-amount',
        permanent: true,
      },
      {
        source: '/2024-salary-increase-for-public-servants-what-to-expect',
        destination: '/blog/2024-salary-increase-for-public-servants-what-to-expect',
        permanent: true,
      },
      {
        source: '/2024-old-age-grant-increase-understanding-the-new-sassa-old-age-grant-amount',
        destination: '/blog/2024-old-age-grant-increase-understanding-the-new-sassa-old-age-grant-amount',
        permanent: true,
      },
    ];
  },
};
