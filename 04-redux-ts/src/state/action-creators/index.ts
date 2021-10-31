import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const searchRepositories = (term: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
    } catch (err) {
      let errorMessage = 'Failed to do something exceptional';
      if (err instanceof Error) errorMessage = err.message;

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: errorMessage,
      });
    }
  };
};
