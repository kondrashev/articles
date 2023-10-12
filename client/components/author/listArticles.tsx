import '@styles/authorListArticles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import React, { FC, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { IArticle, IUser } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getArticles } from '../../store/authors/actions/actions';
import DotsMenu from './dotsMenu';

const ListArticles: FC = () => {
  const { id }: IUser = useAppSelector((state) => state.usersReducer.user);
  const dispatch = useAppDispatch();
  const articles: IArticle[] = useAppSelector((state) => state.authorsReducer.articles);

  const htmlToDraftBlocks = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  useEffect(() => {
    dispatch(getArticles(id));
  }, []);

  return (
    <List className="containerListArticles">
      {articles.map((article, index) => {
        return (
          <Box key={index}>
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
                    <DotsMenu />
                  </Box>
                }
                secondary={
                  <Box className="containerBodyArticle">
                    <Typography className="titleArticle">{article.title}</Typography>
                    <Editor
                      editorState={htmlToDraftBlocks(article.text)}
                      editorStyle={{
                        lineHeight: 0.1,
                        fontSize: '14px',
                        color: 'black',
                      }}
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
    </List>
  );
};

export default ListArticles;
