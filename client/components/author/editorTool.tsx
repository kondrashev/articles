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
        width: '650px',
        borderRadius: '2px',
        padding: '10px',
      }}
      editorStyle={{
        minHeight: '150px',
        lineHeight: 0.1,
        fontSize: '20px',
        color: 'black',
      }}
      toolbarStyle={{
        marginTop: '30px',
        display: 'flex',
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
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
