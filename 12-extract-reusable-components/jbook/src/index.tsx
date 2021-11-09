import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import { setupBundler, bundle } from './bundler';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    setupBundler();
  }, []);

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: 500, height: 200 }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* <pre>{code}</pre> */}
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
