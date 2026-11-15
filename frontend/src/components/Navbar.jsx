import { useState, useEffect } from 'react';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('rail');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['platform', 'rail', 'showcase', 'integrations']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-92px 0px -52% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'Experience', href: '#rail' },
    { name: 'App', href: '#showcase' },
    { name: 'Integrations', href: '#integrations' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const target = element.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`site-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3'
          : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark matching Figma */}
          <a
            href="#rail"
            onClick={(e) => handleLinkClick(e, '#rail')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            aria-label="Fitness Homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                Fitness
                <span className="site-navbar__ai-badge text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  AI
                </span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase font-medium mt-0.5 hidden sm:block">
                Connected Health Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="site-navbar__links hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                className="site-nav-link px-3 py-1 text-xs lg:text-sm font-medium rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('signin')}
              type="button"
              className="site-navbar__signin px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
            >
              Sign in
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              type="button"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-dark bg-accent hover:bg-accent-hover shadow-sm shadow-[0_8px_18px_var(--accent-glow)] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-dark text-xs font-semibold shadow-sm"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="site-navbar__menu-toggle p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="site-navbar__mobile sm:hidden mt-3 p-4 rounded-2xl shadow-xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  className="site-navbar__mobile-link px-3 py-2 text-sm font-medium rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="site-navbar__mobile-actions pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signin');
                }}
                className="site-navbar__mobile-signin w-full py-2.5 text-sm font-medium rounded-xl text-center"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="w-full py-2.5 text-sm font-semibold text-dark bg-accent hover:bg-accent-hover rounded-xl shadow-sm flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
