import '@styles/authorCreateArticle';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { FC } from 'react';

import { IUser } from '../../../constants/constants';
import { useAppSelector } from '../../hooks/hooks';

const CreateArticle: FC = () => {
  const { avatar }: IUser = useAppSelector((state) => state.usersReducer.user);
  return (
    <Box className="containerCreateArticle">
      <Box className="containerTitle">
        <Avatar className="avatar" src={avatar} />
        <TextField label="Title" variant="outlined" className="title" />
      </Box>
    </Box>
  );
};

export default CreateArticle;
