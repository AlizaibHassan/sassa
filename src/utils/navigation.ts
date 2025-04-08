export type NavItem = {
  id: number;
  title: string;
  href: string;
};

export const mainNavItems: NavItem[] = [
  {
    id: 22,
    title: "Sassa Status",
    href: "/check"
  },
  {
    id: 744,
    title: "Payment Dates",
    href: "/payment-dates"
  },
  {
    id: 770,
    title: "Loan Calculator",
    href: "/sassa-loan-calculator"
  },
  {
    id: 1196,
    title: "Balance Check",
    href: "/balance-check"
  },
];

export const serviceNavItems: NavItem[] = [
  {
    id: 1209,
    title: "Change Banking Details",
    href: "/change-banking-details"
  },
  {
    id: 1181,
    title: "Check Verification",
    href: "/check-verification"
  },
];

export const footerGroups = {
  services: {
    title: "Services",
    items: [
      ...mainNavItems,
      ...serviceNavItems,
    ]
  },
  company: {
    title: "Company",
    items: [
      {
        id: 132,
        title: "About Us",
        href: "/about-us"
      },
      {
        id: 726,
        title: "Contact Us",
        href: "/contact-us"
      },
    ]
  },
  legal: {
    title: "Legal",
    items: [
      {
        id: 729,
        title: "Terms of Service",
        href: "/terms-of-service"
      },
      {
        id: 1031,
        title: "Disclaimer",
        href: "/disclaimer"
      },
      {
        id: 3,
        title: "Privacy Policy",
        href: "/privacy-policy"
      }
    ]
  },
  updates: {
    title: "Updates & News",
    items: [
      {
        id: 901,
        title: "Latest News",
        href: "/blog"
      },
    ]
  }
};