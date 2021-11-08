import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;

    editorRef.current.onDidChangeModelContent(() => {
      if (editorRef.current) {
        onChange(editorRef.current?.getValue());
      }
    });

    editorRef.current.getModel()?.updateOptions({ tabSize: 2 });
  }

  // Way 2. to handle change value
  // const handleEditorChange = (value: string | undefined) => {
  //   if (value) {
  //     onChange(value);
  //   }
  // };

  const onFormatClick = () => {
    // get current value from editor
    // format that value
    // set the formatted value back in the editor
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        onMount={handleEditorDidMount}
        // onChange={handleEditorChange}
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
    </div>
  );
};

export default CodeEditor;
