import '@styles/listArticles';

import Box from '@mui/material/Box';
import React, { FC } from 'react';

import ListArticles from '../author/listArticles';
import AppPanel from './appBar';

const ListPublicArticles: FC = () => {
  return (
    <Box className="containerListPublicArticles">
      <AppPanel />
      <ListArticles />
    </Box>
  );
};

export default ListPublicArticles;
