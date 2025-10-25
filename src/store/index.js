import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
