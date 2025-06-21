'use client';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',          label: 'Home' },
  { href: '/services',  label: 'Services' },
  { href: '/industry',  label: 'Industry' },
  { href: '/stories',   label: 'Stories' },
  { href: '/contact',   label: 'Who We Are' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="relative flex items-center justify-between h-16 px-8 bg-transparent z-50">
      {/* ───── Left: logo ───── */}
      <div className="shrink-0">
        <a href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
          Lincoln Atlas
        </a>
      </div>

      {/* ───── Center: nav items (perfectly centred) ───── */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-8">
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`text-sm transition-colors ${
              isActive(href)
                ? 'text-blue-600 font-medium'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ───── Right: button + language links ───── */}
      <div className="shrink-0 flex items-center gap-4">
        {/* a bit more separation from centred group */}
        <a
          href="/contact"
          className="ml-6 px-2 py-1 text-sm text-center w-28 font-semibold text-black outline-2 border-black rounded-full
                     hover:bg-black hover:text-white transition-colors"
        >
          Let’s Talk
        </a>

        <a href="#" className="text-sm text-gray-500 hover:text-blue-600">US</a>
        <a href="#" className="text-sm text-gray-500 hover:text-blue-600">EN</a>
      </div>
    </nav>
  );
}


