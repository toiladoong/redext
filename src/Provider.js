import React, { useCallback, useReducer, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './utils';
import Context from './Context';
import bindActionCreators from './bindActionCreators';

const Provider = (props) => {
  const { store } = props;

  const initialState = store ? store.getState(props.initialValue) : props.rootReducer(props.initialValue || {}, { type: '__INIT__' });

  const reducer = store ? store.getReducer : props.rootReducer;

  const [state, dispatch] = useReducer(reducer, initialState);

  const subscribers = useRef([]);

  const stateRef = useRef(initialState);

  stateRef.current = state;

  const getState = () => {
    return stateRef.current;
  };

  const actions = bindActionCreators({
    dispatch,
    getState,
    cookies: props.cookies
  }, props.rootAction || {});

  const effects = store && store.getEffect(dispatch, state) || {};

  useIsomorphicLayoutEffect(() => {
    subscribers.current.forEach(fn => fn(state));
  }, [state]);

  const subscribe = useCallback((fn) => {
    if (typeof fn === 'function' && subscribers.current.indexOf(fn) === -1) {
      subscribers.current.push(fn);
    }

    return () => {
      const index = subscribers.current.indexOf(fn);

      if (index !== -1) {
        subscribers.current.splice(index, 1);
      }
    };
  }, []);


  const value = {
    state: getState(),
    dispatch,
    actions,
    effects,
    subscribe
  };

  return (
    <Context.Provider
      value={value}
      {...props}
    />
  );
};

export default Provider
