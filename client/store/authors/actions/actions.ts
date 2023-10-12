import { createAsyncThunk } from '@reduxjs/toolkit';

import { IArticle } from '../../../../constants/constants';
import endpoints from '../../../../constants/endpoints';

interface IDataArticle {
  avatar: string;
  login: string;
  title: string;
  text: string;
  userId: number;
}

export const addArticle = createAsyncThunk<IArticle, IDataArticle, { rejectValue: string }>(
  'author/addArticle',
  async ({ avatar, login, title, text, userId }, { rejectWithValue }) => {
    const response = await fetch(`${endpoints.authorRouter}${endpoints.addArticle}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.token },
      body: JSON.stringify({ avatar, login, title, text, userId }),
    });
    if (!response.ok) {
      return rejectWithValue(`Error from server №${response.status} ${response.statusText}!!!`);
    }
    const article: Promise<IArticle> = response.json();
    return article;
  },
);

export const getArticles = createAsyncThunk<IArticle[], number>('author/getArticles', async (id) => {
  const response = await fetch(`${endpoints.authorRouter}${endpoints.getArticles}?userId=${id}`, {
    headers: {
      Authorization: localStorage.token,
    },
  });
  const articles: Promise<IArticle[]> = response.json();
  return articles;
});
