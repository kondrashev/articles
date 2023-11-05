import { createAsyncThunk } from '@reduxjs/toolkit';

import { IArticle } from '../../../../constants/constants';
import endpoints from '../../../../constants/endpoints';

interface IlistPublicArticles {
  count: number;
  rows: IArticle[];
}

export const getPublicArticles = createAsyncThunk<IlistPublicArticles, number>('public/getArticles', async (page) => {
  const response = await fetch(`${endpoints.publicRouter}${endpoints.listArticles}?page=${page}`, {});
  const articles: Promise<IlistPublicArticles> = response.json();
  return articles;
});

export const searchArticles = createAsyncThunk<IArticle[], string>('public/searchArticles', async (pattern) => {
  const response = await fetch(`${endpoints.publicRouter}${endpoints.searchArticles}?pattern=${pattern}`, {});
  const articles: Promise<IArticle[]> = response.json();
  return articles;
});
