import '@styles/DotsMenu';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, MouseEvent, useState } from 'react';

import { useAppContext } from '../../context/context';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteArticles } from '../../store/authors/actions/actions';

const options = ['Edit article', 'Delete article'];

const ITEM_HEIGHT = 48;

interface IProps {
  id: number;
  title: string;
  text: string;
}

const DotsMenu: FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const { values, setValues } = useAppContext();
  const { id, title, text }: IProps = props;
  const [close, setClose] = useState<null | HTMLElement>(null);
  const open = Boolean(close);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setClose(event.currentTarget);
  };
  const handleClose = (option: string) => {
    setClose(null);
    if (option === 'Edit article') {
      setValues({
        ...values,
        articleId: id,
        isEditEditor: true,
        isShowEditor: true,
        titleEditor: title,
        textEditor: text,
      });
    } else if (option === 'Delete article') {
      dispatch(deleteArticles({ listId: [id] }));
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={close}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem className="itemDotsMenu" key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
            {option === 'Edit article' ? <EditNoteIcon className="iconField" /> : <DeleteIcon className="iconField" />}
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DotsMenu;
