import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useHighlightSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [highlightId, setHighlightId] = useState(() => searchParams.get('highlight'));

  useEffect(() => {
    const param = searchParams.get('highlight');
    if (param) {
      setHighlightId(param);
      // Clean up URL param after delay so it doesn't persist on refresh
      const timer = setTimeout(() => {
        setSearchParams((prev) => {
          prev.delete('highlight');
          return prev;
        }, { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);

  return highlightId;
}
