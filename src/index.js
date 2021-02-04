import React from 'react';
import Provider from './Provider';
import connect from './connect';
import memoize from './memoize';
import useStore from './hooks/useStore';
import useDispatch from './hooks/useDispatch';
import useDeepEffect from './hooks/useDeepEffect';
import useDeepIsomorphicLayoutEffect from './hooks/useDeepIsomorphicLayoutEffect';
import useDeepCallback from './hooks/useDeepCallback';
import useDeepMemo from './hooks/useDeepMemo';
import combineReducers from './combineReducers';
import createStore from './createStore';
import isEqual from './utils/isEqual';
import deepEqual from './utils/deepEqual';

const init = (config) => {
  return createStore(config)
};

export {
  Provider,
  connect,
  memoize,
  useStore,
  useDispatch,
  useDeepEffect,
  useDeepIsomorphicLayoutEffect,
  useDeepCallback,
  useDeepMemo,
  combineReducers,
  isEqual,
  deepEqual,
  init
};
