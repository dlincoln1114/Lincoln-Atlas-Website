'use client';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/services',  label: 'Services' },
  { href: '/industry',  label: 'Industry' },
  { href: '/stories',   label: 'Stories' },
  { href: '/contact',   label: 'Who We Are' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="absolute top-0 left-0 right-0 text-white bg-transparent z-50">
      <div className="relative flex items-center justify-between h-16 px-8 max-w-screen-xl mx-auto">

        {/* Logo */}
        <div className="shrink-0">
          <a href="/" className="text-xl font-bold  hover:text-blue-600">
            Lincoln Atlas
          </a>
        </div>

        {/* navigation items */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                isActive(href)
                  ? 'text-blue-600 font-medium'
                  : ' hover:text-blue-600'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* contact button */}
        <div className="shrink-0 flex items-center gap-4">
          <a
            href="/contact"
            className="ml-6 w-28 text-center px-3 py-1.5 text-sm font-semibold
                       border-2 border-black rounded-full
                       hover:bg-black hover:text-white transition-colors"
          >
            Let’s Talk
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-blue-600">US</a>
          <a href="#" className="text-sm text-gray-500 hover:text-blue-600">EN</a>
        </div>
      </div>
    </nav>
  );
}



