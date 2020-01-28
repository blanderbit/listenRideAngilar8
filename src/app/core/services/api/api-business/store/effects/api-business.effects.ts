import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {ApiBusinessActions} from '@api/api-business/store/actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ApiBusinessEffects {
  create$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(ApiBusinessActions.createBusiness),
        exhaustMap(action =>
          this.apiBusinessService.create(action.businessCreateRequest).pipe(
            map(business => ApiBusinessActions.createBusinessSuccess({business})),
            catchError(error => of(ApiBusinessActions.createBusinessError({error})))
          )
        )
      )
  );

  constructor(private actions$: Actions,
              private apiBusinessService: ApiBusinessService) {
  }
}
