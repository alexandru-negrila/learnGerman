import { useState, useEffect, useRef } from 'react';

export default function SectionCard({ title, description, children, defaultOpen = true, id, highlighted = false }) {
  const [open, setOpen] = useState(defaultOpen || highlighted);
  const [showHighlight, setShowHighlight] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (highlighted) {
      setOpen(true);
      setShowHighlight(true);
      const scrollTimer = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      const fadeTimer = setTimeout(() => setShowHighlight(false), 2500);
      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(fadeTimer);
      };
    }
  }, [highlighted]);

  return (
    <div
      ref={cardRef}
      id={id}
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-500 shadow-sm shadow-stone-900/[0.03] ${
        showHighlight
          ? 'border-brand-400 ring-2 ring-brand-200 shadow-lg shadow-brand-100'
          : 'border-stone-200 hover:border-stone-300'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-stone-50/50 transition-colors cursor-pointer border-0 text-left group"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-stone-900 text-base tracking-tight">{title}</h3>
          {description && <p className="text-sm text-stone-400 mt-0.5 truncate">{description}</p>}
        </div>
        <div className={`ml-3 p-1 rounded-full bg-stone-100 group-hover:bg-stone-200 transition-all shrink-0 ${open ? 'rotate-180' : ''}`}>
          <svg
            className="w-4 h-4 text-stone-500 transition-transform"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-stone-100 pt-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
