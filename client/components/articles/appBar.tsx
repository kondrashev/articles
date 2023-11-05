import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { ChangeEvent, FC } from 'react';

import { IArticle } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { searchArticles } from '../../store/public/actions/actions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '150px',
      '&:focus': {
        width: '250px',
      },
    },
  },
}));

const AppPanel: FC = () => {
  const dispatch = useAppDispatch();
  const articles: IArticle[] = useAppSelector((state) => state.listArticlesReducer.articles.rows);

  const searchArticle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchArticles(`${e.currentTarget.value.charAt(0).toUpperCase()}${e.currentTarget.value.slice(1)}`));
  };

  return (
    <AppBar className="appBar">
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search article…" inputProps={{ 'aria-label': 'search' }} onChange={searchArticle} />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default AppPanel;
