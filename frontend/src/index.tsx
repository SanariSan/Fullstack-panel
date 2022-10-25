import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './app';
import { GlobalHistoryCatcherContainer } from './containers/history-catcher';
import { ThemeControllerContainer, ThemeWrapperContainer } from './containers/theme';
import './index.scss';
import { StoreToolkit } from './store';

const history = createBrowserHistory();
const rootElement = document.querySelector('#root') as Element;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={StoreToolkit}>
      <ThemeWrapperContainer>
        <ThemeControllerContainer />
        <Router history={history}>
          <GlobalHistoryCatcherContainer />
          <div
            id="bg"
            className="themed"
            style={{ position: 'fixed', zIndex: '-1', width: '100vw', height: '100vh' }}
          />
          <App />
        </Router>
      </ThemeWrapperContainer>
    </Provider>
  </React.StrictMode>,
);

export {};
