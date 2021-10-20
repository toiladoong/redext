import React from 'react';
import useDeepMemoize from './useDeepMemoize';
import checkDeps from '../utils/checkDeps';

const useDeepCallback = (callback, dependencies) => {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies, 'useDeepCallback');
  }

  return React.useCallback(callback, useDeepMemoize(dependencies));
};

export default useDeepCallback;
