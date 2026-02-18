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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <span className="text-xl">🇩🇪</span>
              <span className="font-bold text-gray-900 text-lg">{t('appTitle')}</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-1">A2</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm no-underline transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Search + Language Toggle + Mobile Menu */}
            <div className="flex items-center gap-2">
              <SmartSearch />
              <button
                onClick={toggleLang}
                className="px-2.5 py-1 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer bg-white"
                title="Switch language"
              >
                {lang === 'en' ? '🇬🇧 EN' : '🇷🇴 RO'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer bg-white border-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-3 gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-lg text-xs no-underline transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-gray-400">
          LearnGerman — A2 Level Grammar Reference
        </div>
      </footer>
    </div>
  );
}
