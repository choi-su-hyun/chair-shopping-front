import { RefObject, useEffect, useMemo, useState } from 'react';

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

// 콜백을 넘길까? entry를 넘겨서 사용하는 컴포넌트 딴에서 알아서 하게 할까?
interface UseIntersectionObserverProps {
  ref: RefObject<Element>;
  options?: IntersectionObserverInit;
}

const defaultOptions: IntersectionObserverInit = {
  threshold: 0,
  root: null,
  rootMargin: '0px',
};

const useIntersectionObserver = ({
  ref,
  options = defaultOptions,
}: UseIntersectionObserverProps) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  // options.threshold 값이 number | number[] 타입이라 stringfy 하고 useEffect dependency로 넘겨줘야 해서
  const stringifyThreshold = useMemo(
    () => JSON.stringify(options.threshold),
    [options.threshold],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(([_entry]) => {
      setEntry(_entry);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref?.current, options.root, options.rootMargin, stringifyThreshold]);

  return entry;
};

export default useIntersectionObserver;
