'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Determine if this is a custom workspace page (Portal, Admin, Luminaire, login/register)
  const isWorkspace = 
    pathname?.startsWith('/portal') || 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/luminaire') || 
    pathname === '/login' || 
    pathname === '/register';

  return (
    <div className="bg-white min-h-screen selection:bg-[#F16736] selection:text-white text-[#1e1e1e]">
      {!isWorkspace && <Navbar />}
      <main>
        {children}
      </main>
      {!isWorkspace && <Footer />}
    </div>
  );
};

export default Layout;
