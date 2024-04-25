import React from 'react';

const CodeEditor = () => {
  const trinketUrl = 'https://trinket.io/embed/python3/f79af42840?start=result';
  const editorHeight = 356;

  return (
    <div style={{ width: '100%', height: editorHeight }}>
      <iframe
        src={trinketUrl}
        title="Embedded Editor"
        width="100%"
        height={editorHeight}
        frameBorder="0"
        // marginWidth="0"
        // marginHeight="0"
        allowFullScreen
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default CodeEditor;
