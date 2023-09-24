import Box from '@mui/material/Box';
import React from 'react';

import { IUser } from '../../../constants/constants';
import { useAppSelector } from '../../hooks/hooks';

const Author: React.FC = () => {
  const getUser: IUser = useAppSelector((state) => state.user.user);
  return <Box>{`Welcome ${getUser.login}!`}</Box>;
};

export default Author;
