'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const CanonicalTag = () => {
  const pathname = usePathname();
  // Update 'https://sassa.web.za' with your actual domain if needed.
  const canonicalUrl = `https://sassa.web.za${pathname}`;

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
