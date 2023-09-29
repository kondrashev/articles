import '@styles/Author';

import Box from '@mui/material/Box';
import React from 'react';

import AppBarMenu from './menu';

const Author: React.FC = () => {
  return (
    <Box className="containerAuthor">
      <AppBarMenu />
    </Box>
  );
};

export default Author;
