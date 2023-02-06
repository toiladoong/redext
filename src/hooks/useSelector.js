import React, { useContext } from 'react';
import useContextSelector from './useContextSelector';

const useSelector = (mapStateToProps) => {
  return useContextSelector(mapStateToProps);
};

export default useSelector
