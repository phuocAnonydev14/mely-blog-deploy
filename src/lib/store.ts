import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '@/lib/features/counter/counterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/lib/types';
import storage from './storage';

const rootReducer = combineReducers({
  counter: counterReducer,
});

type RootReducerType = Required<NonNullable<Parameters<typeof rootReducer>[0]>>;

const persistConfig: PersistConfig<RootReducerType> = {
  key: 'root',
  storage,
  whitelist: ['counter'], // only counter will be persisted
  blacklist: [], // only counter will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
