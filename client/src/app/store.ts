import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
