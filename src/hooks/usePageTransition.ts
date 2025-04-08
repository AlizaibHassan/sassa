'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    if (typeof window !== 'undefined') {
      const handleStart = () => {
        if (mounted) {
          setIsLoading(true);
          setError(null);
        }
      };

      const handleComplete = () => {
        if (mounted) {
          setIsLoading(false);
          // Scroll to top smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      const handleError = () => {
        if (mounted) {
          setIsLoading(false);
          setError('Failed to load page');
        }
      };

      // Use MutationObserver to detect navigation changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'state') {
            handleComplete();
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['state'],
      });

      // Listen for soft navigation
      document.addEventListener('navigationstart', handleStart);
      document.addEventListener('navigationerror', handleError);

      return () => {
        mounted = false;
        observer.disconnect();
        document.removeEventListener('navigationstart', handleStart);
        document.removeEventListener('navigationerror', handleError);
      };
    }
  }, []);

  const navigateWithTransition = async (href: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await router.push(href);
    } catch (error) {
      setError('Navigation failed');
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    navigateWithTransition,
    currentPath: pathname,
  };
}

// Custom event declarations
declare global {
  interface DocumentEventMap {
    navigationstart: Event;
    navigationerror: Event;
  }
}