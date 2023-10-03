import '@styles/author';

import Box from '@mui/material/Box';
import React, { FC } from 'react';

import AppBarMenu from './menu';

const Author: FC = () => {
  return (
    <Box className="containerAuthor">
      <AppBarMenu />
    </Box>
  );
};

export default Author;
