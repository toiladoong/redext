import React, { useContext } from 'react';
import Context from './Context';
import useDeepMemo from './hooks/useDeepMemo';

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  return props => {
    const { state = {}, dispatch, effects } = useContext(Context);

    let filteredState = {};
    let filteredDispatch = {};

    if (mapStateToProps) {
      filteredState = mapStateToProps(state);
    } else {
      filteredState = state
    }

    if (mapDispatchToProps) {
      filteredDispatch = mapDispatchToProps(effects, dispatch)
    }

    const memoState = useDeepMemo(() => {
      return filteredState
    }, [filteredState]);

    return (
      <Component
        {...props}
        {...memoState}
        {...filteredDispatch}
        dispatch={dispatch}
      />
    )
  }
};

export default connect
