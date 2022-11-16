import type { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { userSessionIsAuthinticatedSelector } from '../../store';
import type { TAuthRoute } from './authenticated-access.type';

const AuthenticatedAccessContainer: FC<TAuthRoute> = ({
  children,
  mustBeAuthenticated,
  redirectLocation,
}) => {
  const isAuthenticated = useAppSelector(userSessionIsAuthinticatedSelector);

  return (
    <>{isAuthenticated === mustBeAuthenticated ? children : <Redirect to={redirectLocation} />}</>
  );
};

export { AuthenticatedAccessContainer };
