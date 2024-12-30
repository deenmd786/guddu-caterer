// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for the Redux state
export type AppDispatch = typeof store.dispatch; // Type for dispatching actions
