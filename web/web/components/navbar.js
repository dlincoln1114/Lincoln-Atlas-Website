'use client';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',          label: 'Home' },
  { href: '/services',  label: 'Services' },
  { href: '/industry',  label: 'Industry' },
  { href: '/contact',   label: 'Who We Are' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative flex items-center h-16 px-6 bg-transparent">
      <div className="shrink-0">
        <a href="/" className="text-xl font-semibold">Lincoln Atlas</a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex gap-6">
        {navItems.map(({ href, label }) => (
          <div key={href} className="nav-item">
            <a
              href={href}
              className={`transition-colors ${
                pathname === href
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
}
