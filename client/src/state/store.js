import { configureStore } from '@reduxjs/toolkit';
import linkReducer from './slices/linkSlice.js';

export const store = configureStore({
  reducer: {
    link: linkReducer,
  },
});
