// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './characterSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
