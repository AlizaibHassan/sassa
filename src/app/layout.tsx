import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import "./animations.css";
import Navbar from '@/components/nav/Navbar';
import Footer from '@/components/nav/Footer';
import { Suspense } from 'react';
import Script from 'next/script';
import CanonicalTag from '@/components/CanonicalTag';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 🔥 Essential: allows browser to show fallback text first
});

export const metadata: Metadata = {
  title: 'SASSA Services',
  description: 'Official portal for SASSA services, grants, and updates.',
  icons: {
    icon: '/logo_sassa.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Self-Canonical Tag */}
        <CanonicalTag />
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K9ZJQ3VV');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9ZJQ3VV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        {/* Navbar with Suspense boundary */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        
        {/* Main content with padding for fixed navbar */}
        <main className="flex-grow pt-16 transition-all duration-300">
          <Suspense>{children}</Suspense>
        </main>
        
        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
