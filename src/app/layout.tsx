import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import "./animations.css";
import Navbar from '@/components/nav/Navbar';
import Footer from '@/components/nav/Footer';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        {/* Navbar with Suspense boundary */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        {/* Main content with padding for fixed navbar */}
        <main className="flex-grow pt-16 transition-all duration-300">
          <Suspense>
            {children}
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
