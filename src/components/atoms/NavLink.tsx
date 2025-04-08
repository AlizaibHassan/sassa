'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export default function NavLink({ 
  href, 
  children, 
  className = '',
  activeClassName = '',
  exact = false 
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact 
    ? pathname === href
    : pathname.startsWith(href) && href !== '/' || pathname === href;

  const combinedClassName = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
