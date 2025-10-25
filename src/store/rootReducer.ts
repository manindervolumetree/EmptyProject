import { combineReducers } from '@reduxjs/toolkit';
import { clearReduxStorage, ReduxStorage } from '@/utils/mmkv';
import { persistReducer } from 'redux-persist';
import authSlice from './slices/auth.slice';
import profileSlice from './slices/profile.slice';
import fileUploadSlice from './slices/fileUpload';

const authPersistConfig = {
  key: 'auth',
  storage: ReduxStorage,
  whitelist: ['token'],
};

const profilePersistConfig = {
  key: 'profile',
  storage: ReduxStorage,
  whitelist: ['profile'],
};

const persistedAuthSlice = persistReducer(authPersistConfig, authSlice);
const persistedProfileSlice = persistReducer(
  profilePersistConfig,
  profileSlice,
);

const appReducer = combineReducers({
  auth: persistedAuthSlice,
  profile: persistedProfileSlice,
  fileUpload: fileUploadSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    clearReduxStorage();
    state = undefined; // reset ALL slices to initialState
  }
  return appReducer(state, action);
};

export default rootReducer;
