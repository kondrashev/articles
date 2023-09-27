import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../../../constants/constants';
import { checkAuthorization, deleteUsers, getUsers } from '../actions/actions';

interface userState {
  loading: boolean;
  error: string;
  user: IUser;
  users: IUser[];
  listUsersId: string[];
  update: boolean;
}

const initialState: userState = {
  loading: false,
  error: '',
  user: { id: 0, login: 'none', password: '', role: 'AUTHOR' },
  users: [],
  listUsersId: [],
  update: false,
};

const usersReducer = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [checkAuthorization.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = '';
    },
    [checkAuthorization.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [checkAuthorization.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = '';
    },
    [getUsers.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUsers.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.users = state.users.filter((user) => !action.payload.includes(String(user.id)));
      state.loading = false;
      state.error = '';
      state.update = !state.update;
    },
    [deleteUsers.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [deleteUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
}).reducer;

export default usersReducer;
