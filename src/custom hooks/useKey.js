import { useEffect } from 'react';

export default function useKey(keybtn, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.key === keybtn || e.code === keybtn) {
        action();
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [action, keybtn]);
}
