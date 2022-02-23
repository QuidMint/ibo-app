import { useEffect } from 'react';

export function useDebounce(value: any, handler: () => void, delay: number) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      handler();
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, handler, delay]);
}
