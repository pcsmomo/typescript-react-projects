import { Dispatch } from 'redux';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';

// The structure would be confusing
// store is not exactly redux store, but similar one
// export const persistMiddleware = (store) => {
export const persistMiddleware = ({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) => {
  // next: callback function
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
    };
  };
};
