import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import style from './app.module.scss';
import { AuthenticatedAccessContainer } from './containers/authenticated-access';
import { DashboardContainer } from './containers/dashboard';
import { ErrorBoundaryGenericContainer } from './containers/error-boundary-generic';
// import { ErrorBoundary } from './hooks/error-boundary';
import { LandingContainer } from './containers/landing';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import {
  checkUserSessionAsync,
  setUserSessionCheckLoadStatusIdle,
  themeSelector,
  userInfoLoginSelector,
  userSessionIsAuthinticatedSelector,
  userSessionLoadingStatusSelector,
} from './store';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSelector);
  const isAuthenticated = useAppSelector(userSessionIsAuthinticatedSelector);
  const sessionLoadingStatus = useAppSelector(userSessionLoadingStatusSelector);
  const login = useAppSelector(userInfoLoginSelector);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`loadingStatus ${sessionLoadingStatus} = ${Date.now()}`);
  }, [sessionLoadingStatus]);

  useEffect(() => {
    if (sessionLoadingStatus === 'loading' && isLoading === false) {
      setIsLoading(true);
    } else if (sessionLoadingStatus !== 'loading' && isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }
  }, [sessionLoadingStatus, isLoading]);

  useEffect(() => {
    void dispatch(checkUserSessionAsync());

    return () => {
      void dispatch(setUserSessionCheckLoadStatusIdle());
    };
  }, [dispatch]);

  return (
    <ErrorBoundaryGenericContainer>
      <Container fluid className={'h-100 d-flex align-items-center justify-content-center'}>
        {isAuthenticated === 'idle' ? (
          <></>
        ) : (
          <Switch>
            <Route exact path="/">
              <LandingContainer />
            </Route>
            <Route exact path="/login">
              <AuthenticatedAccessContainer
                mustBeAuthenticated={false}
                redirectLocation={'/dashboard'}
              >
                <LoginContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/register">
              <AuthenticatedAccessContainer
                mustBeAuthenticated={false}
                redirectLocation={'/dashboard'}
              >
                <RegisterContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route exact path="/dashboard">
              <AuthenticatedAccessContainer mustBeAuthenticated={true} redirectLocation={'/login'}>
                <DashboardContainer />
              </AuthenticatedAccessContainer>
            </Route>
            <Route path="/">
              <div>Not found</div>
            </Route>
          </Switch>
        )}
        <textarea
          readOnly
          value={`sessionCheck: ${sessionLoadingStatus}\nisAuthenticated: ${isAuthenticated}\nlogin: ${login}`}
          style={{ position: 'fixed', bottom: 0, height: '100px' }}
        />
        <div
          className={classNames(!isLoading ? style.fade : undefined)}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            opacity: isLoading ? 1 : 0,
            visibility: isLoading ? 'visible' : 'hidden',
            zIndex: 1,
          }}
        >
          <Spinner animation="grow" variant="primary" />
        </div>
        <div
          className={classNames(style.dimmer, !isLoading ? style.fade : undefined)}
          style={{
            opacity: isLoading ? 1 : 0,
            visibility: isLoading ? 'visible' : 'hidden',
          }}
        />
      </Container>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </ErrorBoundaryGenericContainer>
  );
};

export { App };
