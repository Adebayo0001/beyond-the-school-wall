import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Left Side */}
          <div>
            <Link to="/" className="mb-6 block">
              <Logo className="h-12 w-auto" textClassName="text-3xl" />
            </Link>
            <p className="text-neutral-400 text-lg max-w-sm leading-relaxed">
              Where Learning Meets Possibilities! Equipping the next generation with the tools for real-world execution.
            </p>
          </div>

          {/* Right Side - Contact */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Connect</h4>
              <ul className="space-y-4">
                {[
                  { name: 'WhatsApp', icon: 'M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.23 4.81L2 22l5.35-1.39C8.68 21.41 10.29 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.49 0-2.89-.39-4.1-1.07l-.3-.17-3.04.79.81-2.95-.18-.31C4.48 15.18 4 13.65 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z' },
                  { name: 'YouTube', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
                  { name: 'Telegram', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.37-.49 1.02-.73 4-1.74 6.67-2.88 8-3.43 3.82-1.58 4.61-1.85 5.13-1.86.11 0 .37.03.54.17.14.11.18.28.2.45-.02.07-.02.13-.03.19z' },
                  { name: 'Email', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' }
                ].map((social) => (
                  <li key={social.name}>
                    <a href="#" className="flex items-center gap-3 text-neutral-500 hover:text-brand-orange transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d={social.icon} />
                      </svg>
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="space-y-4 text-neutral-500 text-sm font-medium">
                <li><Link to="/#intelligence" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/programs" className="hover:text-white transition-colors">Curriculum</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Orange-Mart</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-sm">
            &copy; {new Date().getFullYear()} Beyond the School Wall. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="text-neutral-500 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors"
          >
            Back to top <ArrowRight size={16} className="-rotate-90" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
