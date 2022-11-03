import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import style from './app.module.scss';
import { DashboardContainer } from './containers/dashboard';
import { LandingContainer } from './containers/landing';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { themeSelector, userAuthSelector, userLoadingSelector } from './store';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSelector);
  const authStatus = useAppSelector(userAuthSelector);
  const loadingStatus = useAppSelector(userLoadingSelector);
  const [isLoadingDelayed, setIsLoadingDelayed] = useState(true);

  console.log(loadingStatus);
  console.log(authStatus);

  // useEffect(() => {
  //   void dispatch(fetchUserStatus());
  // }, []);

  useEffect(() => {
    if (loadingStatus !== 'loading') {
      setTimeout(() => {
        setIsLoadingDelayed(false);
      }, 300);
    }
  }, [loadingStatus]);

  return (
    <>
      <textarea
        readOnly
        value={`isAuthenticated: ${authStatus}`}
        style={{ position: 'fixed', bottom: 0 }}
      />
      <Container fluid className={'h-100 d-flex align-items-center justify-content-center'}>
        {isLoadingDelayed ? (
          <Spinner animation="border" variant="primary" />
        ) : (
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
            {authStatus === true ? (
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
        )}
      </Container>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </>
  );
};

export { App };
