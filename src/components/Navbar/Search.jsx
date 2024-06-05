import { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (e.code === 'Enter') {
        inputEl.current.focus();
      }
    };

    inputEl.current.focus();
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
