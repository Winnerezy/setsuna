// hooks/useInfiniteScroll.ts
import { useEffect, useRef, useState, useCallback } from 'react';

export function useInfiniteScroll(callback: () => void) {
  const [isFetching, setIsFetching] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [callback]
  );

  useEffect(() => {
    if (!isFetching) return;
    callback();
    setIsFetching(false);
  }, [isFetching, callback]);

  return { lastElementRef, isFetching };
}
