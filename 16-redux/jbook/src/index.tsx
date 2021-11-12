import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

import { setupBundler } from './bundler';

const App = () => {
  useEffect(() => {
    // Initialise esbuild
    setupBundler();
  }, []);

  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
