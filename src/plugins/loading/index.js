const validateConfig = (config) => {
}

export default (config = {}) => {
  const modelName = config.name || 'loading';

  const loading = {
    name: modelName,
    state: {
      global: 0,
      models: {},
      effects: {}
    },
    effects: () => {
      return {
        show: () => {

        },
        hide: () => {

        }
      }
    },
    reducers: {
      updateState: (state, payload) => {
        if (typeof payload === 'function') {
          payload = payload(state);
        }

        return {
          ...state,
          ...payload
        };
      }
    }
  }

  return {
    config: {
      models: {
        loading
      }
    }
  }
}