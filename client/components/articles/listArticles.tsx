import '@styles/listArticles';

import Box from '@mui/material/Box';
import React, { FC, useEffect } from 'react';

import { IArticle } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPublicArticles } from '../../store/public/actions/actions';
import AppPanel from './appBar';

const ListArticles: FC = () => {
  const dispatch = useAppDispatch();
  const articles: string = useAppSelector((state) => JSON.stringify(state.listArticlesReducer.articles));
  const sortArticles: IArticle[] = JSON.parse(articles);

  useEffect(() => {
    dispatch(getPublicArticles(0));
  }, []);

  return (
    <Box className="containerListArticles">
      <AppPanel />
    </Box>
  );
};

export default ListArticles;
