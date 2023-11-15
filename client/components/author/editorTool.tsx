import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { FC } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { useAppContext } from '../../context/context';
import { htmlToDraftBlocks } from './listArticles';

const EditorTool: FC = () => {
  const { values, setValues } = useAppContext();

  const getFileBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  };

  const imageUploadCallback = (file) => new Promise((resolve) => getFileBase64(file, (data) => resolve({ data: { link: data } })));

  return (
    <Editor
      placeholder={'Add an article'}
      defaultEditorState={htmlToDraftBlocks(values.textEditor)}
      onEditorStateChange={(newState) => {
        setValues({
          ...values,
          textEditor: draftToHtml(convertToRaw(newState.getCurrentContent())),
        });
      }}
      wrapperStyle={{
        width: 'auto',
        borderRadius: '2px',
        padding: '10px',
      }}
      editorStyle={{
        minHeight: '150px',
        lineHeight: 0.5,
        fontSize: '20px',
        color: '#515151',
      }}
      toolbarStyle={{
        marginTop: '30px',
        display: 'flex',
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      toolbar={{
        options: ['inline', 'textAlign', 'emoji', 'image'],
        inline: {
          inDropdown: false,
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        textAlign: { inDropdown: false },
        emoji: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          emojis: [
            '😀',
            '😁',
            '😂',
            '😃',
            '😉',
            '😋',
            '😎',
            '😍',
            '😗',
            '🤗',
            '🤔',
            '😣',
            '😫',
            '😴',
            '😌',
            '🤓',
            '😛',
            '😜',
            '😠',
            '😇',
            '😷',
            '😈',
            '👻',
            '😺',
            '😸',
            '😹',
            '😻',
            '😼',
            '😽',
            '🙀',
            '🙈',
            '🙉',
            '🙊',
            '👼',
            '👮',
            '🕵',
            '💂',
            '👳',
            '🎅',
            '👸',
            '👰',
            '👲',
            '🙍',
            '🙇',
            '🚶',
            '🏃',
            '💃',
            '⛷',
            '🏂',
            '🏌',
            '🏄',
            '🚣',
            '🏊',
            '⛹',
            '🏋',
            '🚴',
            '👫',
            '💪',
            '👈',
            '👉',
            '👉',
            '👆',
            '🖕',
            '👇',
            '🖖',
            '🤘',
            '🖐',
            '👌',
            '👍',
            '👎',
            '✊',
            '👊',
            '👏',
            '🙌',
            '🙏',
            '🐵',
            '🐶',
            '🐇',
            '🐥',
            '🐸',
            '🐌',
            '🐛',
            '🐜',
            '🐝',
            '🍉',
            '🍄',
            '🍔',
            '🍤',
            '🍨',
            '🍪',
            '🎂',
            '🍰',
            '🍾',
            '🍷',
            '🍸',
            '🍺',
            '🌍',
            '🚑',
            '⏰',
            '🌙',
            '🌝',
            '🌞',
            '⭐',
            '🌟',
            '🌠',
            '🌨',
            '🌩',
            '⛄',
            '🔥',
            '🎄',
            '🎈',
            '🎉',
            '🎊',
            '🎁',
            '🎗',
            '🏀',
            '🏈',
            '🎲',
            '🔇',
            '🔈',
            '📣',
            '🔔',
            '🎵',
            '🎷',
            '💰',
            '🖊',
            '📅',
            '✅',
            '❎',
            '💯',
          ],
        },
        image: {
          uploadCallback: imageUploadCallback,
          uploadEnabled: false,
          previewImage: true,
        },
      }}
    />
  );
};

export default EditorTool;
