import { orderedListCommand } from '@uiw/react-md-editor';
import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id].content = content;
      return;
    case ActionType.DELETE_CELL:
      // 1. delete data
      delete state.data[action.payload];

      // 2. delete order
      // way 1: splice
      const index = state.order.findIndex((id) => id === action.payload);
      state.order.splice(index, 1);
      // way 2: filter
      // state.order = state.order.filter(id => id !== action.payload);

      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
});

export default reducer;
