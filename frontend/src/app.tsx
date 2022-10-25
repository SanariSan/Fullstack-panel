import type { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainContainer } from './containers/main';

const App: FC = () => (
  <Switch>
    <Route exact path="/">
      <MainContainer />
    </Route>
    <Route path="/">
      <div>Not found</div>
    </Route>
  </Switch>
);

export { App };
