import '@styles/Author';

import Box from '@mui/material/Box';
import React, { FC } from 'react';

import CreateArticle from './createArticle';
import ListArticles from './listArticles';
import AppBarMenu from './menu';

const Author: FC = () => {
  return (
    <Box className="containerAuthor">
      <AppBarMenu />
      <CreateArticle />
      <ListArticles />
    </Box>
  );
};

export default Author;
