import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

import CellList from './components/cell-list';

import { setupBundler } from './bundler';

const App = () => {
  useEffect(() => {
    // Initialise esbuild
    setupBundler();
  }, []);

  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
