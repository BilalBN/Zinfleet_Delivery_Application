import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import rootSlice from './rootslice';
import orderslice from './orderslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    root: rootSlice,
    order: orderslice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch;
