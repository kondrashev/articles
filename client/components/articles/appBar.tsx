import '@styles/listArticles';

import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { ChangeEvent, FC } from 'react';

import { IArticle } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
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
  const { values, setValues } = useAppContext();
  const dispatch = useAppDispatch();
  const articles: IArticle[] = useAppSelector((state) => state.listArticlesReducer.searchArticles);

  const searchArticle = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      titleSearch: `${e.currentTarget.value.charAt(0).toUpperCase()}${e.currentTarget.value.slice(1)}`,
      searchGetArticle: '',
    });
    dispatch(searchArticles(`${e.currentTarget.value.charAt(0).toUpperCase()}${e.currentTarget.value.slice(1)}`));
  };

  const changeArticle = (title: string) => {
    setValues({
      ...values,
      titleSearch: '',
      searchGetArticle: title,
    });
  };

  return (
    <>
      <AppBar className="appBar">
        <Toolbar>
          <Search className="search">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search an article…"
              inputProps={{ 'aria-label': 'search' }}
              value={values.titleSearch}
              onChange={searchArticle}
            />
          </Search>
        </Toolbar>
      </AppBar>
      {values.titleSearch.length !== 0 && articles.length > 0 ? (
        <Paper className="searchList">
          <MenuList>
            {articles.map((article) => (
              <MenuItem key={article.id} onClick={() => changeArticle(article.title)}>
                <ListItemText>{article.title.substring(0, 30)}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      ) : null}
    </>
  );
};

export default AppPanel;
