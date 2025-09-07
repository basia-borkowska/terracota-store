import { useEffect, useRef } from 'react';

export const useIntersection = <T extends Element>(
  onIntersect: () => void,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect, options]);

  return ref;
};
