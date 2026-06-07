import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuConfig = [
    {
      name: 'Middle & High School Programs',
      href: '#',
      dropdown: [
        { name: 'Luminaire — Beyond the School Wall Virtual Academy', href: '/luminaire' },
        { name: 'Career Path AI', href: '/career-path-ai' },
        { name: 'Game Based Learning', href: '/game-based-learning' },
        { name: 'Thryb8 (H16–18 Vocational Program)', href: '/thryb8' }
      ]
    },
    {
      name: 'Undergraduate Programs',
      href: '#',
      dropdown: [
        { name: 'Cash On Campus', href: '/programs/cash-on-campus' },
        { name: 'The Magnet School', href: '/programs/the-magnet-school' },
        { name: 'The Skill Hut', href: '/programs/the-skill-hut' }
      ]
    },
    {
      name: 'Events',
      href: '#',
      dropdown: [
        { name: 'The Catalyst Conference', href: '/events/catalyst-conference' },
        { name: 'The Prefect Conference (Leadership Program for Junior and Senior Secondary Schools)', href: '/events/prefect-conference' },
        { name: 'Game Tech Convention', href: '/events/game-tech-convention' }
      ]
    },
    {
      name: 'The Echelon Project Africa',
      href: '#',
      dropdown: [
        { name: 'Virtual Simulation Brain Game Training', href: '/echelon/brain-game-training' },
        { name: 'Tabletop Games', href: '/echelon/tabletop-games' }
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
    if (config.dropdown === null) {
      return location.pathname === config.href;
    }
    return config.dropdown.some(sub => location.pathname === sub.href);
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-[#e8e5e0] ${
          isScrolled ? 'py-2.5 shadow-sm' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          {/* Logo on Left */}
          <Link to="/" className="flex items-center gap-2" id="navbar-logo">
            <Logo className="h-8 w-auto hover:opacity-90 transition-opacity" textClassName="text-xl sm:text-2xl text-[#1e1e1e]" />
          </Link>

          {/* Desktop Menu - Center / Left biased */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-nav-items">
            {menuConfig.map((item, idx) => {
              const hasDropdown = item.dropdown !== null;
              const active = isItemActive(idx);
              
              return (
                <div
                  key={idx}
                  className="relative py-2"
                  onMouseEnter={() => hasDropdown && setDesktopHovered(idx)}
                  onMouseLeave={() => hasDropdown && setDesktopHovered(null)}
                >
                  <button
                    className={`text-sm font-medium tracking-normal flex items-center gap-1 transition-colors ${
                      active ? 'text-[#F16736]' : 'text-neutral-600 hover:text-[#F16736]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-200 ${desktopHovered === idx ? 'rotate-180 text-[#F16736]' : ''}`} />
                  </button>

                  {/* Dropdown Card */}
                  <AnimatePresence>
                    {hasDropdown && desktopHovered === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 w-72 bg-white border border-[#e8e5e0] rounded-2xl p-3 shadow-lg z-50 text-left space-y-1"
                      >
                        {item.dropdown!.map((sub, sIdx) => {
                          const subActive = location.pathname === sub.href;
                          return (
                            <Link
                              key={sIdx}
                              to={sub.href}
                              className={`block p-2.5 rounded-xl text-xs font-semibold whitespace-normal leading-snug transition-all ${
                                subActive 
                                  ? 'bg-[#fff1eb] text-[#F16736]' 
                                  : 'text-neutral-700 hover:bg-[#fff1eb]/60 hover:text-[#F16736]'
                              }`}
                            >
                              {sub.name}
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

          {/* Student Portal CTA on Right */}
          <div className="hidden lg:block">
            <Link
              to="/portal"
              className="px-6 py-2.5 bg-[#F16736] text-white text-sm font-semibold rounded-full hover:bg-[#e05423] transition-all hover:shadow-[0_4px_14px_rgba(241,103,54,0.3)] duration-200"
            >
              Student Portal
            </Link>
          </div>

          {/* Mobile Buttons on Right */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              to="/portal"
              className="px-4 py-1.5 bg-[#F16736] text-white text-xs font-semibold rounded-full hover:bg-[#e05423] transition-all"
            >
              Portal
            </Link>
            <button
              id="mobile-nav-toggle"
              className="text-[#1e1e1e] p-1.5 hover:bg-[#faf9f7] rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="lg:hidden bg-white border-t border-[#e8e5e0] overflow-hidden text-left shadow-lg absolute left-0 right-0 top-full z-40"
            >
              <div className="p-5 space-y-3 max-h-[85vh] overflow-y-auto">
                {/* Mobile Student Portal CTA */}
                <div className="pb-2 border-b border-[#e8e5e0]/30">
                  <Link
                    to="/portal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-2.5 px-4 bg-[#F16736] text-white text-center text-xs font-bold rounded-full hover:bg-[#e05423] transition-all"
                  >
                    Student Portal
                  </Link>
                </div>

                {menuConfig.map((item, idx) => {
                  const hasDropdown = item.dropdown !== null;
                  const active = isItemActive(idx);
                  const expanded = mobileExpanded === idx;

                  return (
                    <div key={idx} className="border-b border-[#e8e5e0]/30 pb-2.5 last:pb-0 last:border-none">
                      <button
                        onClick={() => handleMobileClick(idx, true)}
                        className={`w-full py-2 text-xs font-bold flex items-center justify-between text-left ${
                          active ? 'text-[#F16736]' : 'text-neutral-700'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={14} className={`transition-transform text-neutral-400 ${expanded ? 'rotate-180 text-[#F16736]' : ''}`} />
                      </button>

                      {/* Dropdown Options as Accordion Body */}
                      <AnimatePresence>
                        {hasDropdown && expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-3 mt-1.5 space-y-2 border-l border-[#fff1eb]"
                          >
                            {item.dropdown!.map((sub, sIdx) => {
                              const subActive = location.pathname === sub.href;
                              return (
                                <Link
                                  key={sIdx}
                                  to={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                                    subActive
                                      ? 'bg-[#fff1eb] text-[#F16736]'
                                      : 'text-neutral-600 hover:text-[#F16736]'
                                  }`}
                                >
                                  {sub.name}
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
