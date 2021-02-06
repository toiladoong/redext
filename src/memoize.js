import React from 'react';
import isEqual from './utils/isEqual';

const shallowDiffers = (prev, next) => {
  for (let attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }
  for (let attribute in next) {
    if (!isEqual(prev[attribute], next[attribute])) {
      return true
    }
  }
  return false;
};

const areEqual = (prevProps, nextProps) => {
  const { style: prevStyle, ...prevRest } = prevProps;
  const { style: nextStyle, ...nextRest } = nextProps;

  return !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest)
};

const memoize = (Component, memoPropsAreEqual = areEqual) => {
  return React.memo(Component, memoPropsAreEqual)
};

export default memoize
