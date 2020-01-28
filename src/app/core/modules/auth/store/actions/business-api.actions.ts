import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Business} from '@models/business/business';

export const createSuccess = createAction('[Business/API] Create Success', props<{ business: Business }>());
export const createFailure = createAction('[Business/API] Create Failure', props<{ error: HttpErrorResponse }>());
