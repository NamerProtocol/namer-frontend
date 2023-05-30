import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    enhancers: [],
});

export type State = ReturnType<typeof store.getState>;
export type Action = typeof store.dispatch;
