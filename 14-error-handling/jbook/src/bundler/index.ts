import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

export const setupBundler = async () => {
  try {
    // old version, esbuild-wasm@0.8.27
    // const service = await esbuild.startService({
    await esbuild.initialize({
      worker: true,
      // wasmURL: '/esbuild.wasm',
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.12/esbuild.wasm',
    });

    console.log('esbuild is initialized');
  } catch (err) {
    console.log(err);
  }
};

export const bundle = async (rawCode: string) => {
  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  return result.outputFiles[0].text;
};
