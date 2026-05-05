import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../reudx/fetchers/auth/authSlice";
import langReducer from "../reudx/fetchers/lang/langSlice";
import { baseApi } from "./api/baseApi";
// Define types for persist configs
const persistAuthConfig: PersistConfig<ReturnType<typeof authReducer>> = {
  key: "auth",
  storage,
};

const persistLangConfig: PersistConfig<ReturnType<typeof langReducer>> = {
  key: "lang",
  storage,
};

// Create persisted reducers with proper typing
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedLangReducer = persistReducer(persistLangConfig, langReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    lang: persistedLangReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Define RootState and AppDispatch for TypeScript usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);