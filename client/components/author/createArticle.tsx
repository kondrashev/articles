import '@styles/CreateArticle';

import CancelIcon from '@mui/icons-material/Cancel';
import NearMeIcon from '@mui/icons-material/NearMe';
import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, FC, useEffect } from 'react';

import { IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addArticle, updateArticle } from '../../store/authors/actions/actions';
import EditorTool from './editorTool';

const CreateArticleContainer = styled(Box)(() => ({}));

const CreateArticle: FC = () => {
  const { values, setValues, refEditor } = useAppContext();
  const dispatch = useAppDispatch();
  const { avatar, login, id }: IUser = useAppSelector((state) => state.usersReducer.user);

  useEffect(() => {
    refEditor.current++;
  }, [values.titleEditor, values.textEditor]);

  const articleAdd = () => {
    if (refEditor.current <= 2 || !values.titleEditor || !values.textEditor.length || values.textEditor.length === 8) {
      setValues({
        ...values,
        isShowEditor: false,
        isEditEditor: false,
        titleEditor: '',
        textEditor: '',
        articleId: 0,
        isShowCloseButtonCreateArticle: false,
      });
      refEditor.current = 0;
      return;
    }
    if (values.isEditEditor) {
      const data = {
        id: values.articleId,
        title: values.titleEditor,
        text: values.textEditor,
      };
      dispatch(updateArticle(data));
    } else {
      const data = {
        avatar,
        login,
        title: values.titleEditor,
        text: values.textEditor,
        userId: id,
      };
      dispatch(addArticle(data));
    }
    setValues({
      ...values,
      isShowEditor: false,
      isEditEditor: false,
      titleEditor: '',
      textEditor: '',
      articleId: 0,
      isShowCloseButtonCreateArticle: false,
    });
    refEditor.current = 0;
  };

  const onChangeTitleArticle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      isShowCloseButtonCreateArticle: false,
      titleEditor: `${e.currentTarget.value.charAt(0).toUpperCase()}${e.currentTarget.value.slice(1)}`,
    });
  };

  const handleClose = () => {
    setValues({
      ...values,
      isShowEditor: false,
      isEditEditor: false,
      titleEditor: '',
      textEditor: '',
      articleId: 0,
      isShowCloseButtonCreateArticle: false,
    });
    refEditor.current = 0;
  };

  const visibleButtonClose = () => {
    setValues({
      ...values,
      isShowCloseButtonCreateArticle: true,
    });
  };

  const unvisibleButtonClose = () => {
    setValues({
      ...values,
      isShowCloseButtonCreateArticle: false,
    });
  };

  const ButtonClose = () => {
    setValues({
      ...values,
      isShowCloseButtonCreateArticle: true,
    });
  };

  return (
    <>
      <CreateArticleContainer
        className="containerCreateArticle"
        onMouseLeave={visibleButtonClose}
        onMouseMoveCapture={unvisibleButtonClose}
        sx={{ height: values.isShowEditor ? '310px' : '0px', transition: 'height .8s', top: values.isShowEditor && '90px' }}
      >
        {values.isShowEditor && (
          <Box>
            <TextField
              multiline
              label="Title"
              variant="outlined"
              placeholder="Add a title of article"
              onChange={onChangeTitleArticle}
              className="createArticleTitle"
              value={values.titleEditor}
            />
            {!values.titleEditor && (
              <InputLabel sx={{ position: 'absolute', top: '80px', left: '10px', width: 'auto', color: 'red' }}>Title can not be empty!</InputLabel>
            )}
            <EditorTool />
            {values.textEditor.length === 0 || values.textEditor.length === 8 ? (
              <InputLabel sx={{ position: 'absolute', top: '300px', left: '10px', width: 'auto', color: 'red' }}>Text can not be empty!</InputLabel>
            ) : null}
            {values.textEditor.length === 0 || values.textEditor.length === 8 ? null : (
              <IconButton onClick={articleAdd} sx={{ position: 'absolute', top: '28px', left: '620px' }}>
                <NearMeIcon color="primary" />
              </IconButton>
            )}
          </Box>
        )}
        {values.isShowCloseButtonCreateArticle && (
          <IconButton
            onMouseMoveCapture={ButtonClose}
            onClick={handleClose}
            sx={{ position: 'absolute', top: '-20px', left: '670px', cursor: 'pointer', zIndex: '10' }}
          >
            <CancelIcon color="primary" />
          </IconButton>
        )}
      </CreateArticleContainer>
    </>
  );
};

export default CreateArticle;
