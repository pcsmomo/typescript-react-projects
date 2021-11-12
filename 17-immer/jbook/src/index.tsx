import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

import { setupBundler } from './bundler';

const App = () => {
  useEffect(() => {
    // Initialise esbuild
    setupBundler();
  }, []);

  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
