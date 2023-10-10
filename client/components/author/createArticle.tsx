import '@styles/authorCreateArticle';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { InputLabel } from '@mui/material';
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
  const closeForms = () => {
    setValues({
      ...values,
      isShowEditor: false,
    });
  };

  const addArticle = () => {
    if (!values.titleEditor || values.textEditor.length === 0 || values.textEditor.length === 8) {
    } else {
      const data = {
        avatar,
        login,
        title: values.titleEditor,
        text: values.textEditor,
        userId: id,
      };
      setValues({
        ...values,
        isShowEditor: false,
      });
    }
  };

  const onChangeTitleArticle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      titleEditor: e.currentTarget.value,
    });
  };

  const showEditorTool = () => {
    setValues({
      ...values,
      isShowEditor: true,
    });
  };

  return (
    <ClickAwayListener onClickAway={closeForms}>
      <Box
        className="containerCreateArticle"
        sx={{
          height: values.isShowEditor ? '400px' : '50px',
          transition: 'height .7s',
        }}
      >
        <Box className="containerTitle">
          <Avatar className="avatar" src={avatar} />
          <TextField
            label="Title"
            variant="outlined"
            className="title"
            placeholder="Add titel article"
            onChange={onChangeTitleArticle}
            onClick={showEditorTool}
          />
        </Box>
        {values.isShowEditor && (
          <Box className="containerEditorTool">
            {!values.titleEditor && <InputLabel className="inputErrorTitle">Title can not be empty!</InputLabel>}
            <EditorTool />
            {values.textEditor.length === 0 || values.textEditor.length === 8 ? (
              <InputLabel className="inputErrorEditor">Text can not be empty!</InputLabel>
            ) : null}
            <Button disableElevation variant="contained" color="primary" className="buttonEditor" onClick={addArticle}>
              Add article
            </Button>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default CreateArticle;
