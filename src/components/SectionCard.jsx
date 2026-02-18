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
      className={`bg-white rounded-xl border overflow-hidden transition-all duration-700 ${
        showHighlight
          ? 'border-blue-400 ring-2 ring-blue-300 shadow-lg shadow-blue-100'
          : 'border-gray-200'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors cursor-pointer border-0 text-left"
      >
        <div>
          <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}
