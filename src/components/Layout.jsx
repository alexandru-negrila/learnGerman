import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import SmartSearch from './SmartSearch';

const navItems = [
  { path: '/', key: 'home', icon: '🏠' },
  { path: '/verbs', key: 'verbs', icon: '📝' },
  { path: '/pronouns', key: 'pronouns', icon: '👤' },
  { path: '/prepositions', key: 'prepositions', icon: '📍' },
  { path: '/articles', key: 'articles', icon: '📋' },
  { path: '/sentences', key: 'sentences', icon: '🔤' },
  { path: '/phrases', key: 'phrases', icon: '💬' },
  { path: '/numbers', key: 'numbers', icon: '🔢' },
  { path: '/practice', key: 'practice', icon: '🎯' },
];

export default function Layout({ children }) {
  const { t, lang, toggleLang } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header — glassmorphism */}
      <header className="glass border-b border-stone-200/60 sticky top-0 z-50 shadow-sm shadow-stone-900/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 no-underline group">
              <span className="text-xl transition-transform group-hover:scale-110">🇩🇪</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-stone-900 text-lg tracking-tight">{t('appTitle')}</span>
                <span className="hidden sm:inline text-[10px] font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-full">A2</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-1.5 rounded-lg text-sm no-underline transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm shadow-brand-500/10'
                        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                    }`}
                  >
                    <span className="mr-1 text-xs">{item.icon}</span>
                    {t(item.key)}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search + Language Toggle + Mobile Menu */}
            <div className="flex items-center gap-2">
              <SmartSearch />
              <button
                onClick={toggleLang}
                className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-sm font-medium hover:bg-stone-50 active:scale-95 transition-all cursor-pointer bg-white/80"
                title="Switch language"
              >
                {lang === 'en' ? '🇬🇧 EN' : '🇷🇴 RO'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-stone-100 active:scale-95 transition-all cursor-pointer bg-transparent border-0"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav — animated */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-100 bg-white/95 backdrop-blur-sm mobile-nav-enter">
            <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 gap-1.5">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl text-xs no-underline transition-all active:scale-95 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm shadow-brand-500/10'
                        : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 bg-white/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-stone-400">LearnGerman — A2 Level Grammar Reference</span>
          <span className="text-[10px] text-stone-300">Ctrl+K to search anywhere</span>
        </div>
      </footer>
    </div>
  );
}
