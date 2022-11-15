import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
// import { ErrorBoundary } from './hooks/error-boundary';
import { Route, Switch } from 'react-router-dom';
import style from './app.module.scss';
import { DashboardContainer } from './containers/dashboard';
import { LandingContainer } from './containers/landing';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import {
  checkUserSessionAsync,
  themeSelector,
  userSessionIsAuthinticatedSelector,
  userSessionLoadingStatusSelector,
} from './store';

const ErrorFallbackComponent: FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong:</p>
    <Button type="button" variant={'warning'}>
      {/* onClick={resetErrorBoundary} */}
      Try again
    </Button>
  </div>
);

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // E.g. log to an error logging client here
  console.group('err');
  console.log(error.message);
  console.log(error.stack);
  console.log(info.componentStack);
  console.groupEnd();
};

const App: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSelector);
  const isAuthenticated = useAppSelector(userSessionIsAuthinticatedSelector);
  const sessionLoadingStatus = useAppSelector(userSessionLoadingStatusSelector);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(authStatus);

  useEffect(() => {
    console.log(`loadingStatus ${sessionLoadingStatus} = ${Date.now()}`);

    if (sessionLoadingStatus === 'loading') {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  }, [sessionLoadingStatus]);

  useEffect(() => {
    void dispatch(checkUserSessionAsync());
  }, [dispatch]);

  return (
    <>
      <textarea
        readOnly
        value={`loadingStatus: ${sessionLoadingStatus}\nisAuthenticated: ${isAuthenticated}`}
        style={{ position: 'fixed', bottom: 0 }}
      />
      <Container fluid className={'h-100 d-flex align-items-center justify-content-center'}>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <ErrorBoundary
            FallbackComponent={ErrorFallbackComponent}
            onError={myErrorHandler}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
          >
            <Switch>
              <Route exact path="/">
                <LandingContainer />
              </Route>
              <Route exact path="/login">
                <LoginContainer />
              </Route>
              <Route exact path="/register">
                <RegisterContainer />
              </Route>
              {isAuthenticated === true ? (
                <Route exact path="/dashboard">
                  <DashboardContainer />
                </Route>
              ) : (
                <div>Forbidden</div>
              )}
              <Route path="/">
                <div>Not found</div>
              </Route>
            </Switch>
          </ErrorBoundary>
        )}
      </Container>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </>
  );
};

export { App };
