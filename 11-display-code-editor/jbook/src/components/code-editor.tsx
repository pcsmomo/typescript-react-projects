import './code-editor.css';
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
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(
    monacoEditor: monaco.editor.IStandaloneCodeEditor
  ) {
    editorRef.current = monacoEditor;

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
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={handleEditorDidMount}
        // onChange={handleEditorChange}
        defaultValue={initialValue}
        defaultLanguage="javascript"
        theme="vs-dark"
        height="500px"
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
