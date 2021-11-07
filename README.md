# typescript-react-projects

React and Typescript: Build a Portfolio Project by Stephen Grider

## Folder structure

1. 01-rts: React TypeScript
2. 04-redux-ts: Redux
3. 06-code-transpiling
   - bundler: to observe main.js file after Webpack bundling
4. 07-esbuild
   - jbook: a demo app using esbuild
   - react-17.0.2-package: https://registry.npmjs.org/react/-/react-17.0.2.tgz
5. 10-untrusted-code-execution
   - jbook: extended from last lecture
6. 11-display-code-editor
   - jbook: extended from last lecture

# Details

<details open> 
  <summary>Click to Contract/Expend</summary>

## Section 1: React with Typescript

### 4. Generating TypeScript-Enabled Projects

```sh
npx create-react-app 01-rts --template typescript
```

## Section 2: Types Around Props and State

### 7. The Big Difference with Props

Two Big Checks By TypeScript

1. Parent: Are we providing the correct props to Child when we show it in Parent?
2. Child: Are we using the correctly named + typed props in Child?

### 8. Explicit Component Type Annotations

React Component Properties

1. propTypes
2. displayName
3. defaultProps
4. contextTypes

```js
export const ChildAsFC: React.FC<ChildProps> = ({ color }) => {};
// 1. 'Child' will be a React function component
// 2. 'Child' might have properties assigned to it like 'propTypes' and 'contextTypes'
// 3. 'Child' will receive props of type 'ChildProps'
```

### 9. Annotations with Children

```js
export const ChildAsFC: React.FC<ChildProps> = ({ color }) => {};
// React.FC accepts children without type define
```

## Section 3: Types Around Events and Refs

### 19. Applying Types to Refs

```js
const inputRef = (useRef < HTMLInputElement) | (null > null);
```

## Section 4: Typescript with Redux

### 21. App Overview

```sh
npx create-react-app 04-redux-ts --template typescript
```

### 22. Project Setup

Taking a new branch redux-ts-latest-packages to install latest packages

```sh
# npm install --save-exact @types/react-redux@7.1.15 axios@0.21.1 react-redux@7.2.2 redux@4.0.5 redux-thunk@2.3.0
npm install --save axios react-redux redux redux-thunk
npm install --save-dev @types/react-redux
```

### 23. Redux Store Design

[NPM Search API](https://registry.npmjs.org/-/v1/search?text=react)

> We will create redux/index.ts as an end point, \
> and to prevent connecting to all different reducers/actions and so on

### 28. Applying Action Interfaces

```js
// Type Guard
if (action.type === 'search_repositories_success') {
  // 100% certainty that 'action' satisfies the
  // SearchRepositoriesSuccessAction interface
}
```

### 31. Adding Action Creators

Since TypeScript 4.4, errors are automatically cast as unknown\
https://stackoverflow.com/questions/60151181/object-is-of-type-unknown-typescript-generics

```js
// Error message: Object is of type 'unknown'.
payload: err.message,
```

There are 2 ways to go

1. Type guard

   ```js
   try {
   } catch (err) {
     let errorMessage = 'Failed to do something exceptional';
     if (err instanceof Error) errorMessage = err.message;

     dispatch({
       type: ActionType.SEARCH_REPOSITORIES_ERROR,
       payload: errorMessage,
     });
   }
   ```

2. Change tsconfig.json option
   ```json
   {
     "useUnknownInCatchVariables": false
   }
   ```

### 41. Awkward Typings Around React-Redux

- [Redux Style Guide: Use Static Typing](https://redux.js.org/style-guide/style-guide#use-static-typing)
- [Redux: Static Typing](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-root-state-and-dispatch-types)

```js
// 04-redux-ts/src/state/reducers/index.ts
export type RootState = ReturnType<typeof reducers>;
```

To let TypeScirpt know the type of the Root State when using _useSelector_

### 42. Creating a Typed Selector

[Redux: Defin Typed Hooks](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks)

```js
// 04-redux-ts/src/hooks/useTypedSelector.ts
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
```

> Some of these libraries make TypeScript integration unnecessarily difficult.\
> But we have to deal with it in the javascript world.

> I think this is where I gave up when I tried to learn this course 7 months ago for the first time. \
> Fortunately, I'm dealing it better this time.

## Section 5: The Big App - Here's What We're Building!

### 46. Three Big Challenges

1. Code will be provided to Preview as a string. We have to execute it safely.
2. This code might have advanced JS syntax in it (like JSX) that your browser can't execute.
3. The code might have import statements for other JS files or CSS. We have to deal with those import statements before executing the code.

## Section 6: Code Transpiling in the Browser

### 47. Transpiling Options

1. React App (Code) <-> Backend API Server (Transpiled Code)
2. React App; In-Browser Transpiler (Code <-> Transpiled Result)

### 49. Module Systems

1. AMD: define(['dep'], (dep) => {});
2. common js: require/module.exports
3. ES Modules: import/export

- Transpiler: Babel
- Budnler: Webpack

### 50. Behind the Scenes with Webpack

```sh
mkdir bundler
npm init -y
npm install --save-exact webpack@5.11.1 webpack-cli@4.3.0
```

```json
// inline-source-map: just not to
{
  "build": "webpack --mode=development --devtool=inline-source-map"
}
```

```sh
npm run build
# The code is written in 'commonjs'
```

```js
// ./dist/main.js
var webpack_modules = {
  './src/message.js': (module) => {
    module.exports = 'Hi there';
  },
};
function webpack_require(moduleId) {
  var moduleFn = webpack_modules[moduleId];
  // Create a new module
  var module = { exports: {} };
  // Execute the module function
  moduleFn(module);
  // Return the exports of the module
  return module.exports;
}

// ./src/index.js
const message = webpack_require('./src/message.js');
console.log(message);
```

### 51. Webpack with ES Modules

Change the commonjs syntax to ES module syntax import/export \
`npm run build` \
the `./dist/main.js` looks different from the commonjs one.

### 53. Options for Bundling

1. Bundling Option #1: it doesn't seem quite right
   1. React App -> code to Backend API Server
   2. Backend API Server
      1. Webpack Runs
      2. Webpack finds missing module
      3. npm install pluging gets module
         - NPM registry
         - [NpmInstallWebpackPlugin](https://v4.webpack.js.org/plugins/npm-install-webpack-plugin/)
      4. Bundle complete!
   3. Bundled Code to React App
2. Bundling option #2: better solution than option #1
   1. React App -> code to Backend API Server
   2. Backend API Server
      1. (same)
      2. Webpack finds an import statement
      3. We write plugin to fetch individual file from npm
         - NPM registry
      4. (same)
   3. (same)
3. Bundling option #3: same as option #2, but only in React App
   1. React App
      1. Webpack Runs
      2. Webpack finds an import statement
      3. We write plugin to fetch individual file from npm
         - NPM registry
      4. Bundle complete!

### 54. So Which Approach?

Transpiling/Bundling Remotely or Locally?

1. Remote: Backend API Server
   1. We can cache downloaded NPM modules to bundle code faster
   2. Will work better for users with slow devices or limited internet connections
2. Local: React App
   1. Removes an extra request to the API server
      - faster code execution!
   2. We don't have to maintain an API server!
   3. Less complexity
      - no moving code back and forth

We are going with option #3: Everything in the React App

> One small problem: Webpack doesn't work in the browser...

### 55. A Webpack Replacement

Babel (Works in the browser) + Webpack (Doesn't work) \
-> ESBuild : ESBuild can transpile + bundle our code - all in the browser!

- [ESBuild - Github](https://github.com/evanw/esbuild)
- [ESBuild - Homepage](https://esbuild.github.io/)

ESBuild is significantly fast!

## Section 7: Implementing In-Browser Bundling

### 56. A Demo App

```sh
npx create-react-app jbook --template typescript
```

### 57. Project Setup

```sh
# npm install --save-exact esbuild-wasm@0.8.27
# wasm: Web Assembly
npm install --save esbuild-wasm
# "esbuild-wasm": "^0.13.12",
```

### 59. Understanding ESBuild

- ESBuild is built in Go language
- So how this pakcage understans my javascript code?
- We installed `esbuild-wasm` which is esbuild web assembly.
- This WASM(web assembly) binary has Go Lang bundler which complies to work in the browser

Copy esbuild.wasm to my work directory\
`cp 07-esbuild/jbook-demo-app/node_modules/esbuild-wasm/esbuild.wasm 07-esbuild/jbook-demo-app/public`

### 61. Using Refs for Arbitrary Values

[ESBuild - Running in the browser](https://esbuild.github.io/api/#running-in-the-browser)

### 62. Transpiling Works!

[ESBuild - Transform API](https://esbuild.github.io/api/#transform-api)

### 63. Troubles with Bundling in the Browser

ESBuild will look at the file system and find the modules first.\
But we are running esbuild in the browser, so it cannot find the modules there.\
-> We need to write plugin to fetch individual file(=module) from npm

### 64. Issues with NPM

```sh
npm view react dist.tarball
# https://registry.npmjs.org/react/-/react-17.0.2.tgz
# This address is where you reach when `npm install`
```

Download react-17.0.2.tgz, uncompress and have a look.\
`./07-esbuild/react-17.0.2.package`

### 65. Solution with Unpkg

Directly fetching npm package would cause a CORS error.\
(It didn't come to me though unlike the lecture shows)

So we can use UNPKG

[UNPKG - download npm package](https://unpkg.com/)

### 68. Deep Dive on Bundling

[ESBuild Plugins - DOC](https://esbuild.github.io/plugins/)

ESBuild Bundling Process

1. onResolve step: Figure out where the index.js file is stored
2. onLoad step: Attempt to load up the index.js file
3. Parse the index.js file, find any import/require/exports
4. onResolve step: If there are any import/require/exports, figure out where the requested file is
5. onLoad step: Attmept to load that file up

## Section 8: Dynamic Fetching and Loading of NPM Modules

### 71. Dynamically Fetching Modules

```sh
npm install --save axios
```

```js
// The result includes both commonjs and ES modules
// So it's quite long
return {
  contents: `
      import message from 'tiny-test-pkg';
      console.log(message);
   `,
};
// Change to commonjs
return {
  contents: `
      const message = require('tiny-test-pkg');
      console.log(message);
   `,
};
```

### 73. Issues with Multi-File Packages

Test with a different package https://unpkg.com/medium-test-pkg \
-> it tries to import https://unpkg.com/./utils, but not https://unpkg.com/medium-test-pkg/utils

### 74. Solving Relative Paths

Use `new URL()`

### 76. Failing Nested Requires

Test with a different package https://unpkg.com/nested-test-pkg \
-> index.js and all other files are under ./src

### 77. Resolving Nested Paths

[URL - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)

```js
// Both are the same
new URL('./', 'https://unpkg.com/nested-test-pkg@1.0.0/src/index.js');
new URL('.', 'https://unpkg.com/nested-test-pkg@1.0.0/src/index.js');
```

## Section 9: Caching For Big Performance Gains

### 81. Crazy Numbers of Requests

### 82. Implementing a Caching Layer

**IndexedDB** : we need to store large amount of data

[Difference between localStorage and indexedDB](https://softwareengineering.stackexchange.com/questions/219953/how-is-localstorage-different-from-indexeddb)

- localStorage : Web Storage
  - smaller amount of data
  - synchronous API
  - very simple to use
- indexedDB
  - larger amount of data
  - both synchronous and an asynchronouse API
  - more complicated to use

Additionally,

1. In a few situations, like Service Workers, you cannot use blocking code, hence, you cannot use localStorage, and must use something like indexedDB.
2. The API for indexedDB is complex and tedious (I'd go so far as to say "horrific", YMMV). There are several "wrapper" libraries to simplify the API, I strongly suggest that you look at those.

[npm localforage - make it easy to use IndexedDB](https://www.npmjs.com/package/localforage)

```sh
npm install --save localforage
```

### 88. Loading CSS Files

https://unpkg.com/bulma

```js
import 'bulma/css/bulma.css';
```

### 89. Configuring the Correct Loader

[ESBuild - CSS](https://esbuild.github.io/content-types/#css)

### 95. A Better Way of Loading WASM

```js
// To Test
import 'tiny-test-pkg';
import 'medium-test-pkg';
import 'nested-test-pkg';
import 'react';
import 'bulma/css/bulma.css';
```

## Section 10: Safely Handling Untrusted Code Execution

### 96. Executing User Code

```js
try {
  eval(result.outputFiles[0].text);
} catch (err) {
  alert(err);
}
// code -> Error occured
setTimeout(() => {
  console.asdlfkad();
}, 100);
```

### 100. Different Execution Context

The current setting of our iframe _allow_ communication between the parent and the child

```js
// on Child, access to parent
window.a; // X
parent.a; // O

// on Parent, access to child
document.querySelector('iframe').contentWindow.b;
```

### 102. Sandboxing an IFrame

[IFrame sandbox - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox)

```html
<!-- Block direct communication -->
<iframe sandbox="" src="/test.html" />
<!-- Allow direct communication -->
<iframe sandbox="allow-same-origin" src="/test.html" />
```

### 103. Breaking Access with Different Domains

```sh
# /etc/hosts
127.0.0.1 nothing.localhost
```

> Cannot communicate between different domain names

### 104. How Do IFrames Fix Anything?

Solution #1!

load iframe with different domain name.\
All online coding platforms such as codepen.io, codesandbox.io do the same.\
Then the executed code from iframe cannot manipulate the main frame working on.

### 107. Middle Ground Approach

Solution #2, Chosen

- Using sandbox="" property on `<iframe>`
- Downsize is in-browser features suc as localStorage cannot be used in this case.

### 108. IFrames with SrcDocs

[iframe srcdoc - W3Schools](https://www.w3schools.com/tags/att_iframe_srcdoc.asp)

### 110. Running Unescaped Code

There are two possible problems

1. if the code has `</script>`
2. if the code is too long

### 111. Indirect Communication Between Frames

This light communication is possible, even after we have disabled direct communication\

```js
// on Client side, in devTool console
// the 3rd argument is useCapture
window.addEventListener('message', (event) => console.log(event), false);
// on Parent side
parent.postMessage('hello there', '*');
```

[Window.postMessage() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

### 113. It Works!

> As well as those react packages are cached,\
> So it's quite fast!

```js
// Test typing and submit it!
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>Hi there!</h1>;

ReactDOM.render(<App />, document.querySelector('#root'));
```

### 115. Issues with Repeat Execution

```js
// If I execute this one, the <div id="root"></div> will be removed,
// and it will cause an error in next execution
document.body.innerHTML = '';
```

## Section 11: Displaying a Code Editor in a React App

### 118. Issues with Eager Bundling

```js
// Every changes
onChange={(e) => {
  onClick(e.target.value);
  setInput(e.target.value);
}}
```

Observe Chrome -> More tools -> Task Manager -> Tab: React App \
Whenever typing, the app uses tremendous resource like CPU and battery.

</details>
