import { configureStore } from '@reduxjs/toolkit';
import uiReducer from "slices/uiSlice";
import authReducer from "slices/auth/authSlice";
import apiSlice from 'slices/auth/apiSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})