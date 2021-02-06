import Provider from './Provider';
import createStore from './createStore';
import connect from './connect';
import memoize from './memoize';
import useDispatch from './hooks/useDispatch';
import useDeepEffect from './hooks/useDeepEffect';
import useDeepIsomorphicLayoutEffect from './hooks/useDeepIsomorphicLayoutEffect';
import useDeepCallback from './hooks/useDeepCallback';
import useDeepMemo from './hooks/useDeepMemo';
import isEqual from './utils/isEqual';
import deepEqual from './utils/deepEqual';

const init = (config) => {
  return createStore(config)
};

export {
  Provider,
  connect,
  memoize,
  useDispatch,
  useDeepEffect,
  useDeepIsomorphicLayoutEffect,
  useDeepCallback,
  useDeepMemo,
  isEqual,
  deepEqual,
  init
};
