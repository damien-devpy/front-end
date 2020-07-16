// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { offline } from '@redux-offline/redux-offline';

// import handleFetch from './utils/api/handleFetch';
import rootReducer from './reducers';

// const getMethod = (action) => action.meta.offline.effect.method || 'GET';
// const getUrl = (action) => action.meta.offline.effect.url;
// const customEffect = (effect) => {
//   const { url, method, json } = effect;
//   return handleFetch(url, {
//     method,
//     body: JSON.stringify(json),
//   });
// };

// Last Value Queue
// Only keep the last action for each URL-method pair.
// const customEnqueue = (array, action) => {
//   const newArray = array.filter(
//     (item) =>
//       !(
//         getMethod(item) === getMethod(action) && getUrl(item) === getUrl(action)
//       )
//   );
//   newArray.push(action);
//   return newArray;
// };

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // offline({
    //   ...offlineConfig,
    //   effect: customEffect,
    //   queue: { ...offlineConfig.queue, enqueue: customEnqueue },
    // })
  )
);
