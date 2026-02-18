import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useClickOutside } from '../hooks/useClickOutside';
import { useDebounce } from '../hooks/useDebounce';
import { filterEntries } from '../data/searchIndex';

export default function SmartSearch() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const debouncedQuery = useDebounce(query, 150);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMobileExpanded(false);
    setQuery('');
    setHighlightedIndex(-1);
  }, []);

  useClickOutside(containerRef, close);

  const results = useMemo(() => filterEntries(debouncedQuery), [debouncedQuery]);

  // Global keyboard shortcuts: Ctrl+K or / to focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (window.innerWidth < 640) {
          setIsMobileExpanded(true);
          setTimeout(() => mobileInputRef.current?.focus(), 50);
        } else {
          desktopInputRef.current?.focus();
        }
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes(e.target.tagName) &&
        !e.target.isContentEditable
      ) {
        e.preventDefault();
        if (window.innerWidth < 640) {
          setIsMobileExpanded(true);
          setTimeout(() => mobileInputRef.current?.focus(), 50);
        } else {
          desktopInputRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelect = useCallback((entry) => {
    navigate(`${entry.link}?highlight=${entry.sectionId}`);
    close();
  }, [navigate, close]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      close();
      desktopInputRef.current?.blur();
      mobileInputRef.current?.blur();
      return;
    }
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightedIndex]);
    }
  }, [isOpen, results, highlightedIndex, handleSelect, close]);

  const handleChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.trim().length > 0);
    setHighlightedIndex(-1);
  }, []);

  const openMobile = useCallback(() => {
    setIsMobileExpanded(true);
    setTimeout(() => mobileInputRef.current?.focus(), 50);
  }, []);

  const sharedInputProps = {
    type: 'text',
    value: query,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onFocus: () => query.trim().length > 0 && setIsOpen(true),
    placeholder: t('searchPlaceholder') || 'Search words...',
    role: 'combobox',
    'aria-expanded': isOpen,
    'aria-controls': 'smart-search-results',
    'aria-activedescendant': highlightedIndex >= 0 ? results[highlightedIndex]?.id : undefined,
    autoComplete: 'off',
  };

  const categoryIcons = {
    verb: '📝',
    preposition: '📍',
    conjunction: '🔤',
    questionWord: '🔤',
    connector: '🔤',
    negation: '🔤',
    article: '📋',
    pronoun: '👤',
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop input */}
      <div className="hidden sm:block relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          {...sharedInputProps}
          ref={desktopInputRef}
          className="w-full sm:w-48 lg:w-56 pl-8 pr-14 py-1.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-stone-50/80 hover:bg-white focus:bg-white transition-all placeholder:text-stone-400"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-[10px] text-stone-400 select-none">
          <span className="px-1.5 py-0.5 rounded-md border border-stone-200 bg-white leading-none font-sans shadow-sm">⌃K</span>
        </kbd>
      </div>

      {/* Mobile: icon or expanded overlay */}
      <div className="sm:hidden">
        {isMobileExpanded ? (
          <div className="fixed inset-x-0 top-0 h-14 glass flex items-center px-4 gap-2 z-[60] border-b border-stone-200/60 shadow-sm">
            <svg className="w-4 h-4 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              {...sharedInputProps}
              ref={mobileInputRef}
              className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
            />
            <button
              onClick={close}
              className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer bg-transparent border-0 shrink-0"
              aria-label="Close search"
            >
              <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={openMobile}
            className="p-2 rounded-lg hover:bg-stone-100 transition-all active:scale-95 cursor-pointer bg-transparent border-0"
            aria-label={t('searchPlaceholder') || 'Search words'}
          >
            <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && query.trim().length > 0 && (
        <div
          id="smart-search-results"
          role="listbox"
          className={`absolute mt-2 bg-white rounded-2xl border border-stone-200 shadow-xl shadow-stone-900/10 max-h-80 overflow-y-auto z-[60] animate-scale-in ${
            isMobileExpanded ? 'fixed left-4 right-4 top-14' : 'right-0 w-80 sm:w-96 top-full'
          }`}
        >
          {results.length > 0 ? (
            <div className="py-1">
              {results.map((entry, i) => (
                <button
                  key={entry.id}
                  id={entry.id}
                  role="option"
                  aria-selected={i === highlightedIndex}
                  onClick={() => handleSelect(entry)}
                  className={`w-full text-left px-4 py-2.5 border-0 cursor-pointer transition-all ${
                    i === highlightedIndex ? 'bg-brand-50' : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs shrink-0">{categoryIcons[entry.category] || '📄'}</span>
                    <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                      <span className="font-semibold text-stone-900 text-sm">{entry.german}</span>
                      <span className="text-stone-300">=</span>
                      <span className="text-stone-500 text-sm truncate">{entry.english}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                      {entry.categoryLabel}
                    </span>
                  </div>
                  {entry.example && (
                    <p className="text-xs text-stone-400 italic mt-0.5 ml-5 truncate">
                      {entry.example}
                    </p>
                  )}
                  {entry.isVerb && (
                    <span className="text-xs text-brand-600 font-medium mt-0.5 ml-5 inline-block">
                      {t('seeVerbForms') || 'See verb forms'} →
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-stone-400">{t('noResults') || 'No results found'}</p>
              <p className="text-xs text-stone-300 mt-1">Try a different spelling or keyword</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
