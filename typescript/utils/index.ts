import { useEffect, useLayoutEffect, useReducer } from 'react';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const forcedReducer = state => state + 1;

export const useForceUpdate = () => useReducer(forcedReducer, 0)[1];

export const shallowDiffers = (prev, next) => {
  for (let attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }
  for (let attribute in next) {
    if (JSON.stringify(prev[attribute]) !== JSON.stringify(next[attribute])) {
      return true;
    }
  }
  return false;
};

export const memoPropsAreEqual = (prevProps, nextProps) => {
  const { style: prevStyle, ...prevRest } = prevProps;
  const { style: nextStyle, ...nextRest } = nextProps;

  return !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest)
};
