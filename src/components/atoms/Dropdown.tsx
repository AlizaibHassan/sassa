'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Dropdown() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Menu
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <Link
              href="/logout"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
