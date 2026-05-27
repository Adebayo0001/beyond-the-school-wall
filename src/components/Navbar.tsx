import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Creativity', href: '/#creativity' },
    { name: 'Intelligence', href: '/#intelligence' },
    { name: 'Innovation', href: '/#innovation' },
    { name: 'Programs', href: '/programs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-[#e8e5e0] ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" textClassName="text-2xl text-[#1e1e1e]" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.href.startsWith('/#') ? (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[#1e1e1e] hover:text-[#F16736] transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href ? 'text-[#F16736]' : 'text-[#1e1e1e] hover:text-[#F16736]'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
          <button className="px-5 py-2 rounded-full bg-[#F16736] text-white text-sm font-semibold hover:bg-[#F16736]/90 transition-all border border-[#F16736]">
            Portal
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#1e1e1e] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-[#e8e5e0] p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-[#1e1e1e] hover:text-[#F16736]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-lg font-medium ${
                      location.pathname === item.href ? 'text-[#F16736]' : 'text-[#1e1e1e] hover:text-[#F16736]'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                to="/#join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-[#F16736] text-white font-bold text-center block"
              >
                Join the Community
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
