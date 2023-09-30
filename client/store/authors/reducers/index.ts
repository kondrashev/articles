import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { upLoadFile } from '../actions/actions';

interface authorState {
  loading: boolean;
  error: string;
  fileName: string;
}

const initialState: authorState = {
  loading: false,
  error: '',
  fileName: '',
};

const authorsReducer = createSlice({
  name: 'authorsReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [upLoadFile.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
      state.loading = false;
      state.error = '';
    },
    [upLoadFile.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [upLoadFile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
}).reducer;

export default authorsReducer;
