import '@styles/authorListArticles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import DotsMenu from './dotsMenu';

const ListArticles: FC = () => {
  const mockData = [
    {
      avatar: 'images/avatar.jpg',
      author: 'Pavel',
      date: `${new Date().toLocaleDateString('uk-UK')}p.`,
      title: 'I will be',
      text: 'I will be in your neighborhood doing errands this...',
    },
    {
      avatar: 'images/avatar.jpg',
      author: 'Pavel',
      date: `${new Date().toLocaleDateString('uk-UK')}p.`,
      title: 'I will be',
      text: 'I will be in your neighborhood doing errands this...',
    },
    {
      avatar: 'images/avatar.jpg',
      author: 'Pavel',
      date: `${new Date().toLocaleDateString('uk-UK')}p.`,
      title: 'I will be',
      text: 'I will be in your neighborhood doing errands this...',
    },
  ];

  return (
    <List className="containerListArticles">
      {mockData.map((article, index) => (
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
                    <b>Author</b>: {article.author}
                  </Typography>
                  <Typography className="dateArticle">
                    <b>Published</b>: {article.date}
                  </Typography>
                  <DotsMenu />
                </Box>
              }
              secondary={
                <Box className="containerBodyArticle">
                  <Typography className="titleArticle">{article.title}</Typography>
                  <Typography className="textArticle">{article.text}</Typography>
                </Box>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
  );
};

export default ListArticles;
