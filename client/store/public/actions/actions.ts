import { createAsyncThunk } from '@reduxjs/toolkit';

import { IArticle } from '../../../../constants/constants';
import endpoints from '../../../../constants/endpoints';

export const getPublicArticles = createAsyncThunk<IArticle[], number>('public/getArticles', async (page) => {
  const response = await fetch(`${endpoints.publicRouter}${endpoints.listArticles}?page=${page}`, {});
  const articles: Promise<IArticle[]> = response.json();
  return articles;
});
