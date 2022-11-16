import { useEffect, useState } from 'react';

const useDelayedUnmount = ({ isOpened, delay = 200 }: { isOpened: boolean; delay: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpened && !isMounted) {
      setIsMounted(true);
    } else if (!isOpened && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, delay);
    }
  }, [isOpened, isMounted, delay]);
};

export { useDelayedUnmount };
