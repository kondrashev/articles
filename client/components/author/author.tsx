import '@styles/Author';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React from 'react';

import { useAppSelector } from '../../hooks/hooks';

const Author: React.FC = () => {
  const login: string = useAppSelector((state) => state.usersReducer.user.login);

  return (
    <Box className="containerAuthor">
      <Avatar className="avatar" src="images/avatar.jpg" />
      <h5 className="login">{`Welcome ${login} !`}</h5>
    </Box>
  );
};

export default Author;
