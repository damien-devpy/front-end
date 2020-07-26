import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './custom_bootstrap/bootstrap.css';
import './i18n';
import './index.css';
import App from './App';
import store from './store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App className="container" />
  </Provider>,
  rootElement
);
