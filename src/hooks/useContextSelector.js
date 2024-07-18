import { useContext, useSyncExternalStore } from 'react';
import Context from '../Context';
import useDeepMemo from './useDeepMemo';

const useContextSelector = (mapStateToProps) => {
  if (useSyncExternalStore) {
    const { subscribe, getState } = useContext(Context);
    const getSnapshot = () => {
      if (!mapStateToProps) {
        return undefined
      }

      const state = getState();

      return mapStateToProps(state);
    };

    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  }

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

export default useContextSelector
