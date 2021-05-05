# redext

A simple global store based on React Context and Hooks

##  Installation

```bash
npm install redext
or
yarn add redext
```

## Use It

```js
// store/models/common.js
import React from 'react';

export default {
  state: {
     theme: 'white',
     showModal: false
  },
  effects: (dispatch) => {
     return {
       onOpenModal(modalState) {
         this.updateState({
           showModal: true,
           modalState
         });
         
         // or
         dispatch({
           type: 'common/updateState',
           payload: {
             showModal: true,
             modalState
           }
         });
         
         // or
         dispatch.common.updateState({
           showModal: true,
           modalState
         })
       }
     }
  },
  reducers: {
      updateState: (state, payload) => {
        return {
          ...state,
          ...payload
        };
      },
      changeTheme: (state) => {
        return {
          ...state,
          theme: state.theme === 'white' ? 'dark' : 'white'
        };
      }
  }
}
```

```js
// store/models/index.js
import common from './common';
import auth from './auth';

export default {
  common,
  auth
}
```

```js
// store/index.js
import { Provider, connect, init, models } from 'redext';

import models from './models';

export { Provider, connect, init, models }
```

```js
// client/index.js
import { Provider, init, models } from './store';

const store = init({
  models
});

const App = ({ children, initialValue = {} }) => {
  return (
    <Provider store={store} initialValue={initialValue}>
       {children}
    </Provider>
  )
}

export default App
```

```js
// client/pages/movie.js
import { connect, memoize, useDeepEffect } from 'redext';

const Movie = ({ dispatch, theme, onOpenModal }) => {
  useDeepEffect(() => {
  }, [array, object]);
  
  return (
    <div>
      {theme}
    </div>
  )
}

const mapState = ({ common: { theme } }) => ({
  theme
});

const mapDispatch = ({ common: { onOpenModal } }) => ({
  onOpenModal
});

// options
const memoPropsAreEqual = (prevProps, nextProps) => {
  if (nextProps.visible !== prevProps.visible) {
    return false
  }

  return true
};

export default connect(mapState, mapDispatch)(memoize(Movie, memoPropsAreEqual))
```
