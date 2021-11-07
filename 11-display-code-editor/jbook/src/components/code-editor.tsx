import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <MonacoEditor
      defaultLanguage="javascript"
      theme="vs-dark"
      height="300px"
      options={{
        wordWrap: 'on',
      }}
    />
  );
};

export default CodeEditor;
