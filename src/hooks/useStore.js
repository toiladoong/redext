import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from '../helpers';
import shallowEqual from '../shallowEqual';

let oldState;

export default function useStore(mapStateToProps, initialState) {
  const [state, setState] = useState(initialState);
  oldState = state;

  useEffect(() => {
    subscribe(handleContextChange);
    return () => unsubscribe(handleContextChange);
  }, []);

  const handleContextChange = (context) => {
    if (typeof mapStateToProps === 'function') {
      const newState = mapStateToProps(context);
      if (!shallowEqual(newState, oldState)) {
        setState(newState);
      }
    } else {
      setState(context);
    }
  };

  return state;
}
