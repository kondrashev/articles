import '@styles/authorCreateArticle';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, FC } from 'react';

import { IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
import { useAppSelector } from '../../hooks/hooks';
import EditorTool from './editorTool';

const CreateArticle: FC = () => {
  const { values, setValues } = useAppContext();
  const { avatar, login, id }: IUser = useAppSelector((state) => state.usersReducer.user);

  const addArticle = () => {
    const data = {
      avatar,
      login,
      title: values.titleEditor,
      text: values.textEditor,
      userId: id,
    };
  };

  const onChangeTitleArticle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      titleEditor: e.currentTarget.value,
    });
  };

  return (
    <Box className="containerCreateArticle">
      <Box className="containerTitle">
        <Avatar className="avatar" src={avatar} />
        <TextField label="Title" variant="outlined" className="title" placeholder="Add titel article" onChange={onChangeTitleArticle} />
      </Box>
      <EditorTool />
      <Button disableElevation variant="contained" color="primary" className="buttonEditor" onClick={addArticle}>
        Add article
      </Button>
    </Box>
  );
};

export default CreateArticle;
