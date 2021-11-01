# typescript-react-projects

React and Typescript: Build a Portfolio Project by Stephen Grider

## Fodler structure

1. 01-rts: React TypeScript
2. 04-redux-ts: Redux

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

</details>
