import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../../constants/constants';
import { checkAuthorization, getUsers } from '../actions/userActions';

interface userState {
  loading: boolean;
  error: string;
  user: IUser;
  users: IUser[];
}

const initialState: userState = {
  loading: false,
  error: '',
  user: { id: 0, login: 'none', password: '', role: 'AUTHOR' },
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuthorization.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
}).reducer;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
  },
}).reducer;

export default { userSlice, usersSlice };
