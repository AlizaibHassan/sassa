'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import NavLink from '@/components/atoms/NavLink';
import NavDropdown from '@/components/atoms/NavDropdown';
import { MenuIcon, XIcon } from 'lucide-react';
import useMobileView from '@/hooks/useMobileView';
import MobileMenu from './MobileMenu';
import { mainNavItems, serviceNavItems } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import './styles.css';
import Image from 'next/image';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobileView();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMobileMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const isServiceDropdownActive = serviceNavItems.some(item => pathname === item.href);

  return (
    <nav ref={navRef} className={`navbar  ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="navbar-brand">
            <Link href="/" className="brand-logo">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className='bg-cover'
              />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          {!isMobile && (
            <div className="navbar-menu">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.id}
                  href={item.href}
                  className="nav-item"
                  activeClassName="active"
                >
                  {item.title}
                </NavLink>
              ))}

              <NavDropdown
                label="Services"
                items={serviceNavItems.map(item => ({
                  name: item.title,
                  href: item.href,
                }))}
                isOpen={activeDropdown === 'services'}
                onToggle={() => handleDropdownToggle('services')}
                isActive={isServiceDropdownActive}
                buttonClassName="dropdown-button"
                contentClassName="dropdown-content"
                itemClassName="dropdown-item"
              />

              <NavLink
                href="/blog"
                className="nav-item"
                activeClassName="active"
              >
                Latest News
              </NavLink>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`mobile-menu ${!isMobileMenuOpen ? 'hidden' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMobileMenuOpen(false);
            }
          }}
        >
          <MobileMenu
            activeDropdown={activeDropdown}
            onDropdownToggle={handleDropdownToggle}
            mainItems={mainNavItems}
            serviceItems={serviceNavItems}
            onClose={closeMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
