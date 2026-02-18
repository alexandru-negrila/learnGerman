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

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop input with Ctrl+K hint badge */}
      <div className="hidden sm:block relative">
        <input
          {...sharedInputProps}
          ref={desktopInputRef}
          className="w-full sm:w-48 lg:w-56 pl-3 pr-14 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 bg-white"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-[10px] text-gray-400 select-none">
          <span className="px-1 py-0.5 rounded border border-gray-200 bg-gray-50 leading-none font-sans">⌃K</span>
        </kbd>
      </div>

      {/* Mobile: icon or expanded overlay */}
      <div className="sm:hidden">
        {isMobileExpanded ? (
          <div className="fixed inset-x-0 top-0 h-14 bg-white flex items-center px-4 gap-2 z-[60] border-b border-gray-200">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              {...sharedInputProps}
              ref={mobileInputRef}
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 bg-white"
            />
            <button
              onClick={close}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer bg-white border-0 shrink-0"
              aria-label="Close search"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={openMobile}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer bg-white border-0"
            aria-label={t('searchPlaceholder') || 'Search words'}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className={`absolute mt-1 bg-white rounded-xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto z-[60] ${
            isMobileExpanded ? 'fixed left-4 right-4 top-14' : 'right-0 w-80 sm:w-96 top-full'
          }`}
        >
          {results.length > 0 ? (
            results.map((entry, i) => (
              <button
                key={entry.id}
                id={entry.id}
                role="option"
                aria-selected={i === highlightedIndex}
                onClick={() => handleSelect(entry)}
                className={`w-full text-left px-4 py-2.5 border-0 cursor-pointer transition-colors ${
                  i === highlightedIndex ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                } ${i > 0 ? 'border-t border-gray-100' : ''}`}
                style={i > 0 ? { borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#f3f4f6' } : {}}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">{entry.german}</span>
                    <span className="text-gray-400 mx-1">=</span>
                    <span className="text-gray-600">{entry.english}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                    {entry.categoryLabel}
                  </span>
                </div>
                {entry.example && (
                  <p className="text-xs text-gray-500 italic mt-0.5 truncate">
                    {entry.example}
                  </p>
                )}
                {entry.isVerb && (
                  <span className="text-xs text-blue-600 font-medium mt-0.5 inline-block">
                    {t('seeVerbForms') || 'See verb forms'} →
                  </span>
                )}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400">
              {t('noResults') || 'No results found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
