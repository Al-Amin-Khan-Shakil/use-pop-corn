import { useEffect, useState } from 'react';

export default function useLocalStorag(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
