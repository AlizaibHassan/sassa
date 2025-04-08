'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavDropdownItem {
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  isActive?: boolean;
  buttonClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}

export default function NavDropdown({
  label,
  items,
  isOpen,
  onToggle,
  isActive,
  buttonClassName = '',
  contentClassName = '',
  itemClassName = ''
}: NavDropdownProps) {
  const pathname = usePathname();

  return (
    <div className="nav-dropdown">
      <button
        onClick={onToggle}
        className={`${buttonClassName} ${isActive ? 'active' : ''}`}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`${contentClassName} ${isOpen ? 'show' : ''}`}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${itemClassName} ${pathname === item.href ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
