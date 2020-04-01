import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiRidesService } from '@api/api-rides/api-rides.service';
import { Router } from '@angular/router';
import * as SearchActions from './search.actions';
import { SearchModel } from '../search.types';
import * as SearchSelector from './index';

@Injectable()
export class SearchEffects {
  loadBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.GetBikes),
      tap(res =>
        this.store.dispatch(SearchActions.setSearchLoading({ loading: true })),
      ),
      withLatestFrom(this.store.select(SearchSelector.getSearchState)),
      switchMap(([action, state]) => {
        const payload = { ...state.metaData, ...state.filterPayload };
        return this.apiRidesService.getByQuery(payload).pipe(
          switchMap(results => {
            const actionToReturn =
              payload.page > 1
                ? SearchActions.GetBikesPageSuccess({ bikes: results.bikes })
                : SearchActions.SuccessGetBikes(results);
            return [
              actionToReturn,
              SearchActions.setSearchLoading({ loading: false }),
            ];
          }),
          catchError(error => of(SearchActions.ErrorGetBikes(error))),
        );
      }),
    ),
  );

  redirectAfterAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SearchActions.SetSearchMetaData),
        withLatestFrom(this.store.select(SearchSelector.getSearchMetadata)),
        map(formattedAddress => {
          return this.router.navigate(['search'], {
            queryParams: { ...formattedAddress },
            replaceUrl: true,
          });
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private apiRidesService: ApiRidesService,
    private store: Store<SearchModel>,
    private router: Router,
  ) {}
}
