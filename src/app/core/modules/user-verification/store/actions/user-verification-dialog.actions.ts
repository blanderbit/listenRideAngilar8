import {createAction, props} from '@ngrx/store';

export const opened = createAction('[User Verification Dialog] Opened', props<{ dialogId: any }>());
export const close = createAction('[User Verification Dialog] Close');
export const closed = createAction('[User Verification Dialog] Closed');
