import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useLoadingTracker } from '../../hooks/use-loading-tracker';

const calculateExpPercentage = (x: number, coeff: number) => (x / (x + coeff)) * 100;

const LoadingTrackerProgressContainer: FC = () => {
  const { isLoading } = useLoadingTracker();
  const { isMounted } = useDelayedUnmount({ isVisible: isLoading, delay: 500 });

  const [x, setX] = useState(0);
  const coeff = 20;
  const [percent, setPercent] = useState(() => calculateExpPercentage(x, coeff));

  useEffect(() => {
    let timerId: NodeJS.Timer | undefined;

    if (isLoading && isMounted) {
      setX(0);
      setPercent(0);

      const ms = Math.random() * (250 - 100) + 100;
      timerId = setInterval(() => {
        setX((prev) => prev + 1);
      }, ms);
    } else if (!isLoading && isMounted) {
      clearInterval(timerId);
      setPercent(100);
    } else if (!isLoading && !isMounted) {
      setX(0);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isLoading, isMounted]);

  useEffect(() => {
    setPercent(calculateExpPercentage(x, coeff));
  }, [x]);

  // console.log(isLoading, isMounted, x, percent);

  return (
    <>
      {isMounted ? (
        <ProgressBar
          variant="info"
          now={percent}
          style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'transparent',
            opacity: isLoading ? 0.6 : 0,
            transitionProperty: 'opacity',
            transitionDuration: '0.6s',
            zIndex: 1000,
          }}
        />
      ) : (
        ''
      )}
    </>
  );
};

export { LoadingTrackerProgressContainer };
