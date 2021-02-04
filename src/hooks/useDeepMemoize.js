import React, { useRef } from 'react';
import deepEqual from '../utils/deepEqual';

const useDeepMemoize = (value) => {
  const ref = useRef([]);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export default useDeepMemoize
