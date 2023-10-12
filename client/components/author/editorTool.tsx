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
      placeholder={'Add article'}
      defaultEditorState={htmlToDraftBlocks(values.textEditor)}
      onEditorStateChange={(newState) => {
        setValues({
          ...values,
          textEditor: draftToHtml(convertToRaw(newState.getCurrentContent())),
        });
      }}
      wrapperStyle={{
        marginTop: '20px',
        width: '640px',
        marginLeft: '10px',
        padding: '10px',
        borderRadius: '2px',
        boxShadow: '2px 2px 2px 0 rgba(0, 0, 0, 0.2)',
      }}
      editorStyle={{
        paddingLeft: '10px',
        minHeight: '175px',
        lineHeight: 0.1,
        fontSize: '20px',
        color: 'black',
      }}
      toolbarStyle={{
        padding: '5px 8px 1px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1px solid rgba(58, 53, 65, 0.12)',
      }}
      toolbar={{
        options: ['inline', 'textAlign', 'image'],
        inline: {
          inDropdown: false,
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        textAlign: { inDropdown: false },
        image: {
          uploadCallback: imageUploadCallback,
          previewImage: true,
        },
      }}
    />
  );
};

export default EditorTool;
