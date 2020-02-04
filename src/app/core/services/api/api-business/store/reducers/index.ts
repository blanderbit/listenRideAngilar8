import {Business} from '@models/business/business';
import {Action, createReducer, on} from '@ngrx/store';
import {ApiBusinessActions} from '@api/api-business/store/actions';
import {BusinessCreateRequest} from '@models/business/business-create-request';
import {HttpErrorResponse} from '@angular/common/http';

export interface ApiBusinessState {
  businessCreateRequest?: BusinessCreateRequest;
  businessCreateError?: HttpErrorResponse;
  business?: Business;
}

export const initialApiState: ApiBusinessState = {
  businessCreateRequest: undefined,
  businessCreateError: undefined,
  business: undefined
};

const reducer = createReducer(
  initialApiState,

  on(ApiBusinessActions.createBusiness, (state, action) => {
    return {
      ...state,
      businessCreateRequest: action.businessCreateRequest
    };
  }),

  on(ApiBusinessActions.createBusinessSuccess, (state, action) => {
    return {
      ...state,
      business: action.business
    };
  }),

  on(ApiBusinessActions.createBusinessError, (state, action) => {
    return {
      ...state,
      businessCreateError: action.error
    };
  })
);

export function apiBusinessReducer(state: ApiBusinessState = initialApiState, action: Action) {
  return reducer(state, action);
}
