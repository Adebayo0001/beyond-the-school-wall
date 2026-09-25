'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

interface SubItem {
  name: string;
  href: string;
  desc?: string;
}

interface ProgramCategory {
  id: string;
  name: string;
  items: SubItem[];
}

interface MenuItem {
  name: string;
  href: string;
  dropdown?: SubItem[] | null;
  categories?: ProgramCategory[] | null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuConfig: MenuItem[] = [
    {
      name: 'Programs',
      href: '/programs',
      dropdown: [
        { name: 'For Middle and High School Students', href: '/inter-junior-workspace', desc: 'Junior Workspace: Trade, Business, AI & Design' },
        { name: 'The Magnet School', href: '/programs/the-magnet-school', desc: 'Secondary school flagship & young professional academy' },
        { name: 'Cash On Campus', href: '/programs/cash-on-campus', desc: 'Student entrepreneurship & financial intelligence' },
        { name: 'Simulations & Games', href: '/simulations', desc: 'Game-based learning, tabletops & live negotiation lab' },
        { name: 'All Programs Overview', href: '/programs' }
      ]
    },
    {
      name: 'For Schools',
      href: '/bring-your-school',
      dropdown: null
    },
    {
      name: 'Simulations & Games',
      href: '/simulations',
      dropdown: [
        { name: 'Virtual simulation training games', href: '/simulations/virtual-training' },
        { name: 'Buy Tabletop or board games', href: '/tabletop-games' },
        { name: 'Game Recommendations for you', href: '/game-recommendations' }
      ]
    },
    {
      name: 'Events',
      href: '#',
      dropdown: [
        { name: 'The Catalyst Conference', href: '/events/catalyst-conference' },
        { name: 'The Prefect Conference (Secondary)', href: '/events/prefect-conference' },
        { name: 'Game Tech Convention', href: '/events/game-tech-convention' }
      ]
    },
    {
      name: 'Tools',
      href: '#',
      dropdown: [
        { name: 'Scholarship Finder AI', href: '/tools/scholarship-finder' },
        { name: 'University Match AI', href: '/tools/university-match' },
        { name: 'Learnin Star AI', href: '/tools/learnin-star' },
        { name: 'AI Project Generator', href: '/tools/project-generator' },
        { name: 'AI Industry Explorer', href: '/tools/industry-explorer' },
        { name: 'Career Path AI', href: '/tools/career-path' }
      ]
    }
  ];

  const isItemActive = (idx: number) => {
    const config = menuConfig[idx];
    if (!config.dropdown) {
      return pathname === config.href;
    }
    return config.dropdown.some(sub => pathname === sub.href);
  };

  const handleMobileClick = (idx: number, hasDropdown: boolean) => {
    if (!hasDropdown) {
      setIsMobileMenuOpen(false);
      return;
    }
    setMobileExpanded(mobileExpanded === idx ? null : idx);
  };

  return (
    <>
      <nav
        id="navbar-root"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#e8e5e0] py-3 shadow-sm'
            : 'bg-white/90 backdrop-blur-md border-b border-[#e8e5e0]/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          {/* Logo on Left */}
          <Link href="/" className="flex items-center gap-2" id="navbar-logo">
            <Logo 
              className="h-8 w-auto hover:opacity-90 transition-opacity" 
              textClassName="text-xl sm:text-2xl font-extrabold text-[#1e1e1e]" 
            />
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9" id="desktop-nav-items">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-[#F16736] font-semibold'
                  : 'text-neutral-700 hover:text-[#F16736]'
              }`}
            >
              Home
            </Link>

            {menuConfig.map((item, idx) => {
              const hasDropdown = Boolean(item.dropdown || item.categories);
              const active = isItemActive(idx);
              
              if (!hasDropdown) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      active
                        ? 'text-[#F16736] font-semibold'
                        : 'text-neutral-700 hover:text-[#F16736]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <div
                  key={idx}
                  className="relative py-2"
                  onMouseEnter={() => setDesktopHovered(idx)}
                  onMouseLeave={() => setDesktopHovered(null)}
                >
                  <button
                    className={`text-sm font-medium tracking-normal flex items-center gap-1.5 transition-colors cursor-pointer ${
                      active 
                        ? 'text-[#F16736]' 
                        : 'text-neutral-700 hover:text-[#F16736]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 text-neutral-400 ${
                        desktopHovered === idx ? 'rotate-180 text-[#F16736]' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Card */}
                  <AnimatePresence>
                    {desktopHovered === idx && item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={`absolute top-full left-0 ${item.name === 'Programs' ? 'w-80 sm:w-96' : 'w-72'} rounded-xl p-3 shadow-xl z-50 text-left space-y-1 bg-white border border-[#e8e5e0]`}
                      >
                        {item.dropdown.map((sub, sIdx) => {
                          const subActive = pathname === sub.href;
                          return (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              className={`block p-2.5 rounded-lg text-xs font-semibold whitespace-normal leading-snug transition-all group ${
                                subActive 
                                  ? 'bg-[#F16736] text-white shadow-sm' 
                                  : 'text-neutral-700 hover:bg-[#fff1eb]/70 hover:text-[#F16736]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={subActive ? 'text-white font-bold' : 'text-neutral-900 font-bold group-hover:text-[#F16736]'}>
                                  {sub.name}
                                </span>
                                <ArrowRight size={12} className={`transition-all duration-150 ${subActive ? 'text-white opacity-100' : 'text-[#F16736] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'}`} />
                              </div>
                              {sub.desc && (
                                <p className={`text-[11px] font-normal mt-0.5 leading-snug ${subActive ? 'text-white/90' : 'text-neutral-500'}`}>
                                  {sub.desc}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/register"
              className="px-6 py-2.5 bg-[#F16736] text-white text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#e05423] transition-all hover:shadow-[0_4px_16px_rgba(241,103,54,0.3)] hover:-translate-y-0.5 active:scale-95 duration-200"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all text-neutral-700 hover:text-[#F16736] hover:bg-neutral-100"
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center bg-neutral-200 text-neutral-700">
                <User size={13} />
              </div>
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Buttons on Right */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/portal"
              className="px-4 py-1.5 bg-[#F16736] text-white text-xs font-bold rounded-lg hover:bg-[#e05423] transition-all"
            >
              Portal
            </Link>
            <button
              id="mobile-nav-toggle"
              className="p-2 rounded-lg transition-colors text-[#1e1e1e] hover:bg-[#faf9f7]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Accordion Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden text-left shadow-2xl absolute left-0 right-0 top-full z-50 border-t bg-white border-[#e8e5e0] text-[#1e1e1e]"
            >
              <div className="p-5 space-y-3 max-h-[85vh] overflow-y-auto">
                <div className="flex gap-2 pb-3 border-b border-[#e8e5e0]">
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-[#F16736] text-white text-center text-xs font-bold rounded-lg hover:bg-[#e05423] transition-all"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-4 text-center text-xs font-bold rounded-lg border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
                  >
                    Login
                  </Link>
                </div>

                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-xs font-bold hover:text-[#F16736]"
                >
                  Home
                </Link>

                {menuConfig.map((item, idx) => {
                  const hasDropdown = Boolean(item.dropdown || item.categories);
                  const active = isItemActive(idx);
                  const expanded = mobileExpanded === idx;

                  if (!hasDropdown) {
                    return (
                      <div key={idx} className="border-b border-[#e8e5e0] pb-2.5 last:pb-0 last:border-none">
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-2 text-xs font-bold ${
                            active ? 'text-[#F16736]' : 'text-neutral-700 hover:text-[#F16736]'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="border-b border-[#e8e5e0] pb-2.5 last:pb-0 last:border-none">
                      <button
                        onClick={() => handleMobileClick(idx, true)}
                        className={`w-full py-2 text-xs font-bold flex items-center justify-between text-left ${
                          active ? 'text-[#F16736]' : 'text-neutral-700'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180 text-[#F16736]' : ''}`} />
                      </button>

                      {/* Dropdown Options */}
                      <AnimatePresence>
                        {expanded && item.dropdown && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-3 mt-1.5 space-y-2 border-l-2 border-[#F16736]/30"
                          >
                            {item.dropdown.map((sub, sIdx) => {
                              const subActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sIdx}
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                                    subActive
                                      ? 'bg-[#F16736] text-white'
                                      : 'text-neutral-700 hover:text-[#F16736] hover:bg-[#fff1eb]/50'
                                  }`}
                                >
                                  <div className="font-bold">{sub.name}</div>
                                  {sub.desc && (
                                    <div className={`text-[10px] font-normal leading-tight mt-0.5 ${subActive ? 'text-white/80' : 'text-neutral-400'}`}>
                                      {sub.desc}
                                    </div>
                                  )}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
