import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useScreenDetails } from '../../hooks/use-screen-details';
import {
  themeSelector,
  userInfoUsernameSelector,
  userAuthIsAuthenticatedSelector,
} from '../../store';
import style from './debug.module.scss';

const DebugContainer: FC = () => {
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();
  const theme = useAppSelector(themeSelector);
  const username = useAppSelector(userInfoUsernameSelector);
  const isAuthenticated = useAppSelector(userAuthIsAuthenticatedSelector);

  useEffect(() => {
    console.log(`isAuthenticated ${isAuthenticated} = ${Date.now()}`);
  }, [isAuthenticated]);

  return (
    <>
      <pre style={{ position: 'fixed', bottom: 0, width: '100%' }} className={style[theme]}>
        Current page size - {`${w} x ${h}`}
      </pre>
      <textarea
        readOnly
        value={`isAuthenticated: ${isAuthenticated}\nusername: ${username}`}
        style={{ position: 'fixed', bottom: 0, right: 0, height: '100px' }}
      />
    </>
  );
};

export { DebugContainer };
