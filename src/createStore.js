function merge(original, extra) {
  return extra ? { ...extra, ...original } : original
}

export default function createStore(config = {}) {
  const { plugins = [] } = config;

  plugins.forEach((plugin) => {
    if (plugin.config) {
      config.models = merge(config.models, plugin.config.models);
    }
  });

  const on = (eventName, callback) => {
    plugins.forEach((plugin) => {
      if (plugin[eventName]) {
        callback(plugin[eventName])
      }
    })
  }

  const { models = {} } = config;

  const getState = (initialState = {}) => {
    const newInitialState = {};

    Object.keys(models).forEach((modelFilename) => {
      const model = models[modelFilename] || {};

      const modelName = model.name || modelFilename;

      newInitialState[modelName] = Object.assign({}, model.state, initialState[modelName])
    });

    return newInitialState;
  };

  const getReducer = (state = {}, action = {}) => {
    const newState = {};

    Object.keys(models).forEach((modelFilename) => {
      const model = models[modelFilename] || {};

      const { reducers = {}, name: modelName = modelFilename } = model;

      let reducerState = state[modelName];

      const actionType = action.type.replace(`${modelName}/`, '');

      if (actionType in reducers) {
        reducerState = reducers[actionType](reducerState, action.payload, action.params);
      }

      newState[modelName] = reducerState;
    });

    return newState;
  };

  const getEffect = (dispatch, state = {}) => {
    const newEffects = {};

    Object.keys(models).forEach((modelFilename) => {
      const modelDispatcher = {};
      const model = models[modelFilename] || {};

      const {
        reducers = {},
        effects: effectsFromConfig = {},
        name: modelName = modelFilename
      } = model;

      modelDispatcher.state = state[modelName];

      const onModelListener = ({ actionName }) => {
        on('onModel', (onModel) => {
          onModel({
            model: {
              ...model,
              name: modelName
            },
            modelName,
            actionName,
            dispatch
          })
        });
      }

      Object.keys(reducers).forEach((actionName) => {
        const type = `${modelName}/${actionName}`;

        modelDispatcher[actionName] = (payload, params) => {
          // onModelListener({ actionName });
          dispatch({ type, payload, params });
        };
      });

      let effects;

      dispatch[modelName] = modelDispatcher;

      if (typeof effectsFromConfig === 'function') {
        effects = effectsFromConfig(dispatch)
      } else {
        effects = effectsFromConfig;
      }

      const effectObj = {};

      Object.keys(effects).forEach((effectName) => {
        const effectFunc = (...args) => {
          onModelListener({
            actionName: effectName
          });

          const callback = effects[effectName].bind(modelDispatcher);

          return callback(...args)
        }

        modelDispatcher[effectName] = effectFunc;
        effectObj[effectName] = effectFunc;
      });

      newEffects[modelName] = effectObj;
    });

    return {
      effects: newEffects,
      models,
      dispatch,
      on
    };
  };

  return {
    getState,
    getReducer,
    getEffect
  }
}
