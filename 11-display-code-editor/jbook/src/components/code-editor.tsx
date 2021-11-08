import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      onChange(value);
    }
  };

  return (
    <MonacoEditor
      onChange={handleEditorChange}
      defaultValue={initialValue}
      defaultLanguage="javascript"
      theme="vs-dark"
      height="300px"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
