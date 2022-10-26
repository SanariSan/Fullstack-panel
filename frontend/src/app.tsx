import classNames from 'classnames';
import type { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import style from './app.module.scss';
import { DashboardContainer } from './containers/dashboard';
import { LandingContainer } from './containers/landing';
import { LoginContainer } from './containers/login';
import { RegisterContainer } from './containers/register';
import { useAppSelector } from './hooks/redux';
import { themeSelector } from './store';

const App: FC = () => {
  const theme = useAppSelector(themeSelector);

  return (
    <>
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
      <div id="bg" className={classNames(style.app, style[theme])} />
    </>
  );
};

export { App };
