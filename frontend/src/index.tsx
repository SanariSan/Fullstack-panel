import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './app';
import { GlobalHistoryCatcherContainer } from './containers/history-catcher';
import './index.scss';
import { StoreToolkit } from './store';

const history = createBrowserHistory();
const rootElement = document.querySelector('#root') as Element;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={StoreToolkit}>
      <Router history={history}>
        <GlobalHistoryCatcherContainer />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);

export {};
