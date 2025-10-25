import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { persistStore } from 'redux-persist';

const createSagaMiddleware = require('redux-saga');

const sagaMiddleware = createSagaMiddleware.default();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
