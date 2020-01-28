import {Business} from '@models/business/business';
import {createReducer, on} from '@ngrx/store';
import {initialState} from '../../../../../../main/search/store/search.reducers';
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

export const apiBusinessReducer = createReducer(
  initialState,

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
