import React from 'react';
import useDeepMemoize from './useDeepMemoize';
import checkDeps from '../utils/checkDeps';

const useDeepMemo = (factory, dependencies) => {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies, 'useDeepMemo');
  }

  return React.useMemo(factory, useDeepMemoize(dependencies));
};

export default useDeepMemo;
