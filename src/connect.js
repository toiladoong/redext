import React, { useContext, useMemo } from 'react';
import Context from './Context';

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

    const [memoState, memoDispatch] = useMemo(() => {
      return [filteredState, filteredDispatch]
    }, [filteredState, filteredDispatch]);

    return (
      <Component
        {...props}
        {...memoState}
        {...memoDispatch}
        dispatch={dispatch}
      />
    )
  }
};

export default connect
