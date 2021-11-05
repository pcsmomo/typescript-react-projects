import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>(false);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    // old version, esbuild-wasm@0.8.27
    // const service = await esbuild.startService({
    await esbuild.initialize({
      worker: true,
      // wasmURL: '/esbuild.wasm',
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.12/esbuild.wasm',
    });
    ref.current = true;
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      console.log('ESBuild is not yet initialized');
      return;
    }

    // const result = await esbuild.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });
    // setCode(result.code);

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // console.log(result);

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: 500, height: 200 }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe src="/test.html" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
