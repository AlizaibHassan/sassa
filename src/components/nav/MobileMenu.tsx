'use client';

import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/utils/navigation';

interface MobileMenuProps {
  activeDropdown: string | null;
  onDropdownToggle: (name: string) => void;
  mainItems: NavItem[];
  serviceItems: NavItem[];
  onClose: () => void;
}

export default function MobileMenu({
  activeDropdown,
  onDropdownToggle,
  mainItems,
  serviceItems,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div className="mobile-menu-container">
      {/* Header with close button */}
      <div className="mobile-menu-header">
        <span className="text-lg font-semibold text-gray-900">Menu</span>
        <button
          onClick={onClose}
          className="p-2 -mr-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 
            transition-colors focus:outline-none active:bg-gray-200"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menu items with better spacing */}
      <div className="mobile-menu-items bg-white p-4 rounded-lg shadow-lg">
        {/* Main navigation items */}
        <div className="space-y-1.5">
          {mainItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Services dropdown */}
        <div className="mobile-dropdown mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onDropdownToggle('services')}
            className={`mobile-dropdown-button ${activeDropdown === 'services' ? 'active' : ''}`}
          >
            <span>Services</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                activeDropdown === 'services' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {activeDropdown === 'services' && (
            <div className="mobile-dropdown-content">
              {serviceItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Latest News link */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href="/blog"
            className={`mobile-nav-item ${pathname === '/blog' ? 'active' : ''}`}
            onClick={onClose}
          >
            Latest News
          </Link>
        </div>
      </div>
    </div>
  );
}
