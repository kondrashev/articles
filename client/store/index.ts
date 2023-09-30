import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authorsReducer from './authors/reducers';
import usersReducer from './users/reducers/index';

const rootReducer = combineReducers({
  usersReducer,
  authorsReducer,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
