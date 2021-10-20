export default function createStore(config = {}) {
  const { models = {} } = config;

  const getState = (initialState = {}) => {
    const newInitialState = {};

    Object.keys(models).forEach((modelFilename) => {
      const dataModel = models[modelFilename] || {};

      const modelName = dataModel.name || modelFilename;

      newInitialState[modelName] = Object.assign({}, dataModel.state, initialState[modelName])
    });

    return newInitialState;
  };

  const getReducer = (state = {}, action = {}) => {
    const newState = {};

    Object.keys(models).forEach((modelFilename) => {
      const dataModel = models[modelFilename] || {};

      const { reducers = {}, name: modelName = modelFilename } = dataModel;

      let reducerState = state[modelName];

      const actionType = action.type.replace(`${modelName}/`, '');

      if (actionType in reducers) {
        reducerState = reducers[actionType](reducerState, action.payload);
      }

      newState[modelName] = reducerState;
    });

    return newState;
  };

  const getEffect = (dispatch, state = {}) => {
    const newEffects = {};

    Object.keys(models).forEach((modelFilename) => {
      const modelDispatcher = {};
      const dataModel = models[modelFilename] || {};

      const { reducers = {}, effects: effectsToConfig = {}, name: modelName = modelFilename } = dataModel;

      modelDispatcher.state = state[modelFilename];

      Object.keys(reducers).forEach((reducerName) => {
        const type = `${modelName}/${reducerName}`;

        modelDispatcher[reducerName] = (payload) => dispatch({ type, payload });
      });

      let effects;

      dispatch[modelFilename] = modelDispatcher;

      if (typeof effectsToConfig === 'function') {
        effects = effectsToConfig(dispatch)
      } else {
        effects = effectsToConfig;
      }

      const effectObj = {};

      Object.keys(effects).forEach((effectName) => {
        effectObj[effectName] = effects[effectName].bind(modelDispatcher)
      });

      newEffects[modelName] = effectObj;
    });

    return {
      effects: newEffects,
      dispatch
    };
  };

  return {
    getState,
    getReducer,
    getEffect
  }
}
