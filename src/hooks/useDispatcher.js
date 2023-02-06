import React, { useContext } from 'react';
import Context from '../Context';

const useDispatcher = (mapDispatchToProps) => {
  const { dispatch, effects } = useContext(Context);
  
  let filteredDispatch = {};
  
  if (mapDispatchToProps) {
    filteredDispatch = mapDispatchToProps(effects, dispatch)
  }
  
  return filteredDispatch
};

export default useDispatcher
