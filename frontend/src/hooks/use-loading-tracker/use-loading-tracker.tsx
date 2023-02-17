import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux';
import { userAuthLoadingStatusSelector } from '../../store';

const useLoadingTracker = () => {
  const authLoadingStatus = useAppSelector(userAuthLoadingStatusSelector);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // || dashboardLoadingStatus === 'loading' || ...
    if (authLoadingStatus === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [authLoadingStatus]);

  return { isLoading };
};

export { useLoadingTracker };
