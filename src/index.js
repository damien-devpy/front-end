import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './components/App';
import IndividualActions from './components/IndividualActions';
import store from './store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <App className='container' /> */}
      <IndividualActions className='container' />
    </BrowserRouter>
  </Provider>,
  rootElement
);
