import React, { useEffect, useLayoutEffect } from 'react';
import useDeepMemoize from './useDeepMemoize';
import checkDeps from '../utils/checkDeps';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useDeepIsomorphicLayoutEffect = (effect, dependencies) => {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies, 'useDeepEffect');
  }

  return useIsomorphicLayoutEffect(effect, useDeepMemoize(dependencies));
};

export default useDeepIsomorphicLayoutEffect;
