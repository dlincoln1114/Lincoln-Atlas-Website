'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const darkPages = ['/',];
export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const scheme = darkPages.includes(pathname) ? 'dark' : 'light';

  return (
    <>
      <Navbar scheme={scheme} />
      {children}
    </>
  );
}
