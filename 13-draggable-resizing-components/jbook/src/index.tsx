import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';

import { setupBundler } from './bundler';

const App = () => {
  useEffect(() => {
    // Initialise esbuild
    setupBundler();
  }, []);

  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
