import React, { useContext } from 'react';
import Context from '../Context';
import useDeepMemo from './useDeepMemo';

const useDispatcher = (mapDispatchToProps) => {
  const { dispatch, effects } = useContext(Context);

  let filteredDispatch = {};

  if (mapDispatchToProps) {
    filteredDispatch = mapDispatchToProps(effects, dispatch)
  }

  return useDeepMemo(() => {
    return filteredDispatch
  }, [filteredDispatch])
};

export default useDispatcher
