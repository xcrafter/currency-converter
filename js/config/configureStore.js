import { AsyncStorage } from 'react-native';
// LIBRARIES & REDUX

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './../reducers/index';
// REDUCERS & HELPERS


export const warn = (error) => {
  // console.warn(error.message || error)
  throw error; // To let the caller handle the rejection
};

export const promises = store => next => action =>
  (typeof action.then === 'function' ? Promise.resolve(action).then(next, warn) : next(action));

const configureStore = (callback) => {
  const enhancer = compose(
    applyMiddleware(thunk, promises, logger),
    autoRehydrate({ log: true }),
  );

  const store = createStore(rootReducer, enhancer);

  persistStore(
    store, { storage: AsyncStorage, whitelist: ['app'], blacklist: [] },
    callback(),
  );

  return store;
};
export default configureStore;

