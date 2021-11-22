import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

// For Manual Test
// import { ActionType } from './action-types';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

// Manual Test
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'code',
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'text',
//   },
// });

// const id = store.getState().cells.order[0];

// console.log(store.getState());
