import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: !(import.meta.env.VITE_NODE_ENV === 'development'),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
