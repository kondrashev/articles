import '@styles/Author';

import Box from '@mui/material/Box';
import React from 'react';

import AppMenu from './menu';

const Author: React.FC = () => {
  return (
    <Box className="containerAuthor">
      <AppMenu />
    </Box>
  );
};

export default Author;
