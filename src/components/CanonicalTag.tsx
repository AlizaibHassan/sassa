'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const CanonicalTag = () => {
  const pathname = usePathname();
  // Update 'https://www.sassa.com' with your actual domain if needed.
  const canonicalUrl = `https://www.sassa.com${pathname}`;

  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [canonicalUrl]);

  return null;
};

export default CanonicalTag;
