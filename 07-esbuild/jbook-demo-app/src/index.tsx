import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef<any>(false);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    // old version, esbuild-wasm@0.8.27
    // const service = await esbuild.startService({
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
    ref.current = true;
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    if (!ref.current) {
      console.log('ESBuild is not yet initialized');
      return;
    }

    console.log(ref.current);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
