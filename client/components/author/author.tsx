import '@styles/author';

import Box from '@mui/material/Box';
import React, { FC } from 'react';

import CreateArticle from './createArticle';
import AppBarMenu from './menu';

const Author: FC = () => {
  return (
    <Box className="containerAuthor">
      <AppBarMenu />
      <CreateArticle />
    </Box>
  );
};

export default Author;
