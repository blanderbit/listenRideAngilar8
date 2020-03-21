import { Action, createReducer, on } from '@ngrx/store';
import { MyBikesState } from '../my-bikes.types';
import * as MyBikesActions from './my-bikes.actions';

export const initialState: MyBikesState = {
  bikes: [],
  selectedBikes: [],
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(MyBikesActions.SuccessGetMyBikes, (state: MyBikesState, payload) => {
    return { ...state, ...payload };
  }),
  on(MyBikesActions.SetMyBikesLoading, (state: MyBikesState, payload) => {
    return { ...state, ...payload };
  }),
);

export function MyBikesReducer(
  state: MyBikesState = initialState,
  action: Action,
) {
  return reducer(state, action);
}
