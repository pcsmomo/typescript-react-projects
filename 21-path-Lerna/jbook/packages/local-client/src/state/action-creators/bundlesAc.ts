import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { BundleStartAction, BundleCompleteAction } from '../actions';
import { bundle } from '../../bundler';

export const createBundle = (cellId: string, input: string) => {
  // This is the redux Thunk!!
  return async (
    dispatch: Dispatch<BundleStartAction | BundleCompleteAction>
  ) => {
    // 1. dispatch BUNDLE_START to make `loading` true
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    // 2. bundle
    const result = await bundle(input);

    // 3. dispatch the result
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
        // bundle: {
        //   code: result.code,
        //   err: result.err
        // }
      },
    });
  };
};
