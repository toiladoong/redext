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
      },
      openModal: (state) => {
        return {
          ...state,
          showModal: true
        }
      },
      closeModal: (state) => {
        return {
          ...state,
          showModal: false
        }
      }
  }
}
```

```js
// store/models/index.js
import common from './common';

export default {
  common
}
```

```js
// store/index.js
import { Provider, connect, init, models } from 'redext';

import models from './models';

export { Provider, connect, init, models }
```

```js
// src/index.js
import { Provider, init, models } from './store';

const initialValue = {};

const store = init({
  models
});

<Provider store={store} initialValue={initialValue}>
  <App />
</Provider>
```

```js
// src/pages/movie.js
import { connect, memoize, useDeepEffect } from 'redext';

const Movie = ({ theme, onOpenModal, changeTheme }) => {
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

const mapDispatch = ({ common: { onOpenModal, changeTheme } }) => ({
  onOpenModal,
  changeTheme
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
