import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../../constants/constants';
import { checkAuthorization } from '../actions/userActions';

interface userState {
  loading: boolean;
  error: string;
  user: IUser;
}

const initialState: userState = {
  loading: false,
  error: '',
  user: { id: 0, login: 'none', password: '', role: 'AUTHOR' },
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
});

export default userSlice.reducer;
