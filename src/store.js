import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { offline } from '@redux-offline/redux-offline';

import handleFetch from './utils/api/handleFetch';
import rootReducer from './reducers';

const customEffect = (effect) => {
  const { url, method, json } = effect;
  return handleFetch(url, {
    method,
    body: JSON.stringify(json),
  });
};

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    offline({ ...offlineConfig, effect: customEffect })
  )
);
