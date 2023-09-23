import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../../constants/constants';
import endpoints from '../../../constants/endpoints';

export interface IData {
  login: string;
  password: string;
}

export const checkAuthorization = createAsyncThunk<IUser, IData, { rejectValue: string }>(
  'user/checkAuthorization',
  async ({ login, password }, { rejectWithValue }) => {
    const response = await fetch(endpoints.signIn, {
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
