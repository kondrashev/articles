import '@styles/AuthorListArticles.scss';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import React, { ChangeEvent, FC, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { IArticle, IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getArticles } from '../../store/authors/actions/actions';
import { getPublicArticles } from '../../store/public/actions/actions';
import DotsMenu from './dotsMenu';

export const htmlToDraftBlocks = (html) => {
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};

const ListArticles: FC = () => {
  const { values, setValues } = useAppContext();
  const { id }: IUser = useAppSelector((state) => state.usersReducer.user);
  const dispatch = useAppDispatch();
  const articles: string = useAppSelector((state) =>
    id !== 0 ? JSON.stringify(state.authorsReducer.articles) : JSON.stringify(state.listArticlesReducer.articles.rows),
  );
  const { count } = useAppSelector((state) => state.listArticlesReducer.articles);
  const articleSearch: IArticle[] = useAppSelector((state) => state.listArticlesReducer.searchArticles).filter(
    (article) => article.title === values.searchGetArticle,
  );
  const sortArticles: IArticle[] = !values.searchGetArticle ? JSON.parse(articles) : articleSearch;

  useEffect(() => {
    if (id !== 0) {
      dispatch(getArticles(id));
    } else {
      dispatch(getPublicArticles(values.page));
    }
  }, [values.page]);

  const getNumberPage = (event: ChangeEvent<unknown>, value: number) => {
    setValues({
      ...values,
      searchGetArticle: '',
      page: value - 1,
    });
  };

  return (
    <List className="containerListArticles" sx={{ top: id === 0 && '80px' }}>
      {sortArticles
        .sort((a, b) => b.id - a.id)
        .map((article) => {
          return (
            <Box key={article.id}>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={article.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box className="containerHeaderArticle">
                      <Typography className="authorArticle">
                        <b>Author</b>: {article.login}
                      </Typography>
                      <Typography className="dateArticle">
                        <b>Published</b>: {`${new Date(article.updatedAt).toLocaleDateString('uk-UK')}p.`}
                      </Typography>
                      {id ? <DotsMenu id={article.id} title={article.title} text={article.text} /> : null}
                    </Box>
                  }
                  secondary={
                    <Box className="containerBodyArticle">
                      <Typography className="titleArticle">{article.title}</Typography>
                      <Editor
                        editorState={htmlToDraftBlocks(article.text)}
                        editorStyle={{
                          lineHeight: 0.5,
                          fontSize: '20px',
                          color: '#333333',
                        }}
                        readOnly={true}
                        wrapperStyle={{
                          width: 'auto',
                          borderRadius: '2px',
                        }}
                        toolbarStyle={{ display: 'none' }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          );
        })}
      {id === 0 && (
        <Box className="containerPagination">
          <Stack spacing={2}>
            <Pagination count={Math.round(count / 2)} variant="outlined" shape="rounded" onChange={getNumberPage} />
          </Stack>
        </Box>
      )}
    </List>
  );
};

export default ListArticles;
