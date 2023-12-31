import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticle } from '../../../../constants/constants';
import { getPublicArticles, searchArticles } from '../actions/actions';

interface listArticlesState {
  loading: boolean;
  error: string;
  articles: { count: number; rows: IArticle[] };
  searchArticles: IArticle[];
}

const initialState: listArticlesState = {
  loading: false,
  error: '',
  articles: { count: 0, rows: [] },
  searchArticles: [],
};

const listArticlesReducer = createSlice({
  name: 'listArticlesReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [getPublicArticles.fulfilled.type]: (state, action: PayloadAction<{ count: number; rows: IArticle[] }>) => {
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
    [searchArticles.fulfilled.type]: (state, action: PayloadAction<IArticle[]>) => {
      state.searchArticles = action.payload;
      state.loading = false;
      state.error = '';
    },
    [searchArticles.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [searchArticles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
}).reducer;

export default listArticlesReducer;
