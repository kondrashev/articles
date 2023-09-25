import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../../constants/constants';
import endpoints from '../../../constants/endpoints';

export const checkAuthorization = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  'user/checkAuthorization',
  async ({ login, password, registration }, { rejectWithValue }) => {
    const response = await fetch(`${endpoints.userRouter}${!registration ? endpoints.checkAuthorization : endpoints.addUser}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    if (!response.ok) {
      return rejectWithValue(`Error from server №${response.status} ${response.statusText}!!!`);
    }
    const data: Promise<IUser> = response.json();
    localStorage.setItem('token', `Bearer ${(await data).token}`);
    return data;
  },
);

export const getUsers = createAsyncThunk<IUser[]>('user/getUsers', async () => {
  const response = await fetch(`${endpoints.userRouter}${endpoints.getUsers}`, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  const users: Promise<IUser[]> = response.json();
  return users;
});
