import Link from 'next/link';
import { footerGroups } from '@/utils/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto print:hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(footerGroups).map(([key, group]) => (
            <div key={key} className="flex flex-col">
              <h3 className="text-lg font-bold mb-6 text-yellow-400">
                {group.title}
              </h3>
              <ul className="space-y-4 flex-grow">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-center md:text-left text-sm">
              <p>&copy; {currentYear} SASSA Services. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {footerGroups.legal.items.slice(0, 2).map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  {item.title}
                </Link>
              ))}
              <Link
                href={footerGroups.company.items[1].href}
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}