import { useEffect, useState } from 'react';

// Useful to play full animation before hiding components
// When isVisible changes to false, isMounted flag changes after delay ms
// So you can start animation when local isVisible === false, then hide when isMounted === false
const useDelayedUnmount = ({ isVisible, delay = 200 }: { isVisible: boolean; delay?: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isVisible && !isMounted) {
      setIsMounted(true);
    } else if (!isVisible && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, delay);
    }
  }, [isVisible, isMounted, delay]);

  return {
    isMounted,
  };
};

export { useDelayedUnmount };
