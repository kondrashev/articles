import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticle } from '../../../../constants/constants';
import { addArticle, getArticles, updateArticle } from '../actions/actions';

interface authorState {
  loading: boolean;
  error: string;
  article: IArticle;
  articles: IArticle[];
}

const initialState: authorState = {
  loading: false,
  error: '',
  article: { id: 0, avatar: '', login: '', title: '', text: '' },
  articles: [],
};

const authorsReducer = createSlice({
  name: 'authorsReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticles.fulfilled.type]: (state, action: PayloadAction<IArticle[]>) => {
      state.articles = action.payload;
      state.loading = false;
      state.error = '';
    },
    [getArticles.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getArticles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addArticle.fulfilled.type]: (state, action: PayloadAction<IArticle>) => {
      state.articles = [...state.articles, action.payload];
      state.loading = false;
      state.error = '';
    },
    [addArticle.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [addArticle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateArticle.fulfilled.type]: (state, action: PayloadAction<IArticle>) => {
      state.articles = state.articles.map((article) => (article.id === action.payload.id ? action.payload : article));
      state.loading = false;
      state.error = '';
    },
    [updateArticle.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateArticle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
}).reducer;

export default authorsReducer;
