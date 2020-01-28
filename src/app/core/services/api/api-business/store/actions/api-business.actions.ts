import {createAction, props} from '@ngrx/store';
import {BusinessCreateRequest} from '@models/business/business-create-request';
import {Business} from '@models/business/business';
import {HttpErrorResponse} from '@angular/common/http';

export const createBusiness = createAction('[API Business] Create business account',
  props<{ businessCreateRequest: BusinessCreateRequest }>());

export const createBusinessSuccess = createAction('[API Business] Create business account success',
  props<{ business: Business }>());

export const createBusinessError = createAction('[API Business] Create business account error',
  props<{ error: HttpErrorResponse }>());
