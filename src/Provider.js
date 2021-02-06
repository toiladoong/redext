import React, { useReducer, useRef } from 'react';
import Context from './Context';

const Provider = (props) => {
  const { store, ...providerProps } = props;

  if (!store) {
    throw new Error('Please use <Provider store={...} initialValue={...}>');
  }

  const initialState = store.getState(props.initialValue);

  const [state, dispatch] = useReducer(store.getReducer, initialState);

  const stateRef = useRef(initialState);

  stateRef.current = state;

  const getState = () => {
    return stateRef.current;
  };

  const { effects, dispatch: dispatcher } = store.getEffect(dispatch, state);

  const value = {
    state: getState(),
    dispatch: dispatcher,
    effects
  };

  return (
    <Context.Provider
      value={value}
      {...providerProps}
    />
  );
};

export default Provider
