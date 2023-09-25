import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from './user/slice';
import ContentSlice from './content/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  content: ContentSlice,
  user: persistReducer(userPersistConfig, userSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
