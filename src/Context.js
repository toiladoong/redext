import { createContext } from 'react';

// const warningObject = {
//   get state() {
//     throw new Error('Please use <Provider rootReducer={...} initialState={...}>');
//   },
//   get dispatch() {
//     throw new Error('Please use <Provider rootReducer={...} initialState={...}>');
//   },
//   get subscribe() {
//     throw new Error('Please use <Provider rootReducer={...} initialState={...}>');
//   }
// };
//
// const calculateChangedBits = (a, b) => (
//   a.dispatch !== b.dispatch || a.subscribe !== b.subscribe ? 1 : 0
// );
//
// const createCustomContext = (
//   w = warningObject,
//   c = calculateChangedBits,
// ) => createContext(w, c);

export default createContext();
