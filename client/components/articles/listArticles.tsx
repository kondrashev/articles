import '@styles/listArticles';

import Box from '@mui/material/Box';
import React from 'react';

import AppPanel from './appBar';

const ListArticles: React.FC = () => {
  return (
    <Box className="containerListArticles">
      <AppPanel />
    </Box>
  );
};

export default ListArticles;
