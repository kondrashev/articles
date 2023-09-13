import { createAsyncThunk } from '@reduxjs/toolkit';

import { IGetUser } from '../../../constants/constants';
import endpoints from '../../../constants/endpoints';

export interface IData {
  login: string;
  password: string;
}

export const checkAuthorization = createAsyncThunk<IGetUser, IData, { rejectValue: string }>(
  'user/checkAuthorization',
  async ({ login, password }, { rejectWithValue }) => {
    const response = await fetch(endpoints.signIn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data: Promise<IGetUser> = response.json();
    localStorage.setItem('token', `Bearer ${(await data).token}`);
    return data;
  },
);
