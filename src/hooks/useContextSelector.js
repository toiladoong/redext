import React, { useContext, useSyncExternalStore } from 'react';
import Context from '../Context';
import useDeepMemo from './useDeepMemo';

const useContextSelector = (mapStateToProps) => {
  const { state = {}, subscribe } = useContext(Context);
  
  let filteredState = {};
  
  if (mapStateToProps) {
    filteredState = mapStateToProps(state);
  } else {
    filteredState = state
  }
  
  if (useSyncExternalStore) {
    const getSnapshot = () => filteredState;
    
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  }
  
  return useDeepMemo(() => {
    return filteredState
  }, [filteredState])
};

export default useContextSelector
