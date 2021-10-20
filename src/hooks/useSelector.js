import React, { useContext } from 'react';
import Context from '../Context';
import useDeepMemo from './useDeepMemo';

const useSelector = (mapStateToProps) => {
  const { state = {} } = useContext(Context);

  let filteredState = {};

  if (mapStateToProps) {
    filteredState = mapStateToProps(state);
  } else {
    filteredState = state
  }

  return useDeepMemo(() => {
    return filteredState
  }, [filteredState])
};

export default useSelector
