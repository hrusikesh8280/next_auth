import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillRender = ({ content }) => {
  return (
    <ReactQuill
      value={content}
      readOnly
      theme="snow"
    />
  );
};

export default QuillRender;
