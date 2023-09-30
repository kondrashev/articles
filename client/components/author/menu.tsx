import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, FC } from 'react';

import { useAppSelector } from '../../hooks/hooks';

const pages = ['Add article', 'Logout'];

const AppBarMenu: FC = () => {
  const Input = styled('input')({
    display: 'none',
  });
  const login: string = useAppSelector((state) => state.usersReducer.user.login);

  const handleCloseNavMenu = (page: string) => {
    console.log(page);
  };

  const upLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => upLoadFile(event)}
              />
              <Button sx={{ my: 2, color: 'white', display: 'block' }} component="span">
                Add avatar
              </Button>
            </label>
            {pages.map((page) => (
              <Button key={page} onClick={() => handleCloseNavMenu(page)} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton>
              <Avatar src="images/avatar.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarMenu;
