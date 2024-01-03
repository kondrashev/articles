import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, FC, useEffect } from 'react';

import { IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { updateArticleAvatar } from '../../store/authors/actions/actions';
import { upLoadFile } from '../../store/users/actions/actions';

const AppBarMenu: FC = () => {
  const { values, setValues } = useAppContext();
  const dispatch = useAppDispatch();
  const Input = styled('input')({
    display: 'none',
  });
  const { login, avatar }: IUser = useAppSelector((state) => state.usersReducer.user);

  const handleCloseNavMenu = () => {
    location.href = '/panel';
  };

  useEffect(() => {
    dispatch(updateArticleAvatar({ login, avatar }));
  }, [avatar]);

  const loadUpFile = (event: ChangeEvent<HTMLInputElement>) => {
    const data = { login, file: event.target.files[0] };
    dispatch(upLoadFile(data));
  };

  const showEditorTool = () => {
    setValues({
      ...values,
      isShowEditor: true,
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            noWrap
            variant="h6"
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {login}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <label htmlFor="contained-button-file">
              <Input
                multiple
                accept="jpg/*"
                id="contained-button-file"
                type="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) => loadUpFile(event)}
              />
              <Button sx={{ my: 2, color: 'white', display: 'block' }} component="span">
                Add avatar
              </Button>
            </label>
            <Button onClick={showEditorTool} sx={{ my: 2, color: 'white', display: 'block' }}>
              Add article
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Logout
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar src={avatar} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarMenu;
