import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Handle hash scrolling if needed, though browser usually handles it
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  // Determine if this is a custom workspace page (Portal, Admin, Luminaire, login/register)
  const isWorkspace = 
    pathname.startsWith('/portal') || 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/luminaire') || 
    pathname === '/login' || 
    pathname === '/register' ||
    pathname === '/luminaire/login';

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
