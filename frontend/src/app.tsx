import type { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashboardContainer } from './containers/dashboard';
import { LandingContainer } from './containers/landing';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';

const App: FC = () => (
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
    <Route exact path="/dashboard">
      <DashboardContainer />
    </Route>
    <Route path="/">
      <div>Not found</div>
    </Route>
  </Switch>
);

export { App };
