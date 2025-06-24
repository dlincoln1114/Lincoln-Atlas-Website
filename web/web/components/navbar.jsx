'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/industry', label: 'Industry' },
  { href: '/stories',  label: 'Stories' },
  { href: '/contact',  label: 'Who We Are' },
];

export default function Navbar({ scheme = 'light' }) {
  const pathname = usePathname();
  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + '/');

  const palette = {
    light: {
      text:      'text-black',
      hover:     'hover:text-blue-600',
      active:    'text-blue-600',
      border:    'border-black',

      // contact button
      btnBase:  'text-black',                         
      btnHover: 'hover:text-white hover:bg-black', 
    },
    dark: {
      text:      'text-white',
      hover:     'hover:text-blue-300',
      active:    'text-blue-300',
      border:    'border-white',

      // contact button
      btnBase:  'text-white',                        
      btnHover: 'hover:text-black hover:bg-white', 
    },
  }[scheme];

  return (
    <nav className="absolute inset-x-0 top-0 bg-transparent z-50">
      <div className="relative flex items-center justify-between h-16 px-8 max-w-screen-xl mx-auto">

        {/* Logo */}
        <a href="/" className={clsx('text-xl font-bold', palette.text, palette.hover)}>
          Lincoln Atlas
        </a>

        {/* Navigation Items */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={clsx(
                'text-sm transition-colors',
                isActive(href)
                  ? `${palette.active} font-medium`
                  : `${palette.text} ${palette.hover}`
              )}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact + locale */}
        <div className="shrink-0 flex items-center gap-4">
          <a
            href="/contact"
            className={clsx(
              'ml-6 w-28 text-center px-3 py-1.5 text-sm font-semibold rounded-full transition-colors',
              `border-2 ${palette.border}`,
              palette.btnBase,
              palette.btnHover
            )}
          >
            Let’s Talk
          </a>
          <a href="#" className={clsx('text-sm', palette.text, palette.hover)}>US</a>
          <a href="#" className={clsx('text-sm', palette.text, palette.hover)}>EN</a>
        </div>
      </div>
    </nav>
  );
}

