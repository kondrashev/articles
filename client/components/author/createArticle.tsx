import NearMeIcon from '@mui/icons-material/NearMe';
import { InputLabel } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, FC, useEffect } from 'react';

import { IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addArticle, updateArticle } from '../../store/authors/actions/actions';
import EditorTool from './editorTool';

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
    });
    refEditor.current = 0;
  };

  const onChangeTitleArticle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      titleEditor: e.currentTarget.value,
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
    });
    refEditor.current = 0;
  };

  return (
    <Menu open={values.isShowEditor} onClose={handleClose} sx={{ position: 'absolute' }}>
      <TextField
        label="Title"
        variant="outlined"
        sx={{
          width: '650px',
          marginTop: '10px',
          marginLeft: '10px',
        }}
        value={values.titleEditor}
        placeholder="Add title article"
        onChange={onChangeTitleArticle}
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
    </Menu>
  );
};

export default CreateArticle;
