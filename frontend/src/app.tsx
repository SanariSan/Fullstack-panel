import classNames from 'classnames';
import type { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import style from './app.module.scss';
import { AuthenticatedAccessContainer } from './containers/authenticated-access';
import { DashboardContainer } from './containers/dashboard';
import { DebugContainer } from './containers/debug';
import { ErrorBoundaryGenericContainer } from './containers/error-boundary-generic';
// import { ErrorBoundaryNativeContainer } from './containers/error-boundary-native';
import { LandingContainer, LandingNavbarContainer } from './containers/landing';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { useAppSelector } from './hooks/redux';
import { themeSelector } from './store';

const App: FC = () => {
  const theme = useAppSelector(themeSelector);

  return (
    <ErrorBoundaryGenericContainer>
      <Container
        fluid
        className={
          'h-100 p-0 d-flex align-items-center justify-content-center flex-column overflow-hidden'
        }
      >
        <LoadingTrackerProgressContainer />
        <Switch>
          <Route exact path="/">
            <LandingNavbarContainer />
            <LandingContainer />
          </Route>
          <Route exact path="/login">
            <LandingNavbarContainer />
            <AuthenticatedAccessContainer
              mustBeAuthenticated={false}
              redirectLocation={'/dashboard'}
            >
              <LoginContainer />
            </AuthenticatedAccessContainer>
          </Route>
          <Route exact path="/register">
            <LandingNavbarContainer />
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
        <DebugContainer />
      </Container>
      <div id="bg" className={classNames(style.app, style[theme])} />
    </ErrorBoundaryGenericContainer>
  );
};

export { App };
