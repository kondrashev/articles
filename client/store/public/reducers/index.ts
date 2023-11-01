import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticle } from '../../../../constants/constants';
import { getPublicArticles } from '../actions/actions';

interface listArticlesState {
  loading: boolean;
  error: string;
  articles: IArticle[];
}

const initialState: listArticlesState = {
  loading: false,
  error: '',
  articles: [],
};

const listArticlesReducer = createSlice({
  name: 'listArticlesReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [getPublicArticles.fulfilled.type]: (state, action: PayloadAction<IArticle[]>) => {
      state.articles = action.payload;
      state.loading = false;
      state.error = '';
    },
    [getPublicArticles.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getPublicArticles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
}).reducer;

export default listArticlesReducer;
