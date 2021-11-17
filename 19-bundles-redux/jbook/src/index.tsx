import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

import CellList from './components/cell-list';

import { setupBundler } from './bundler';

const App = () => {
  const [initialised, setInitialised] = useState(false);
  useEffect(() => {
    // Initialise esbuild
    const result = setupBundler();
    result.then((data) => {
      setInitialised(data);
    });
  }, []);

  return (
    <Provider store={store}>
      {/* TODO: add loading message */}
      {initialised && <CellList />}
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
