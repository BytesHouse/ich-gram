"use client";
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;