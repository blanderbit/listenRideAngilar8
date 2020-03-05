import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {ErrorGetBikes, GetBikes, GetBikesPageSuccess, setSearchLoading, SuccessGetBikes} from './search.actions';
import {Store} from '@ngrx/store';
import {SearchModel} from '../search.types';
import {getSearchState} from './index';
import {ApiRidesService} from '@api/api-rides/api-rides.service';

@Injectable()
export class SearchEffects {

  loadBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBikes),
      tap(res => this.store.dispatch(setSearchLoading({loading: true}))),
      withLatestFrom(this.store.select(getSearchState)),
      switchMap(([action, state]) => {
        const payload = {...state.metaData, ...state.filterPayload};
        return this.apiRidesService.getByQuery(payload)
        .pipe(
          switchMap(results => {
            const actionToReturn = payload.page > 1 ? GetBikesPageSuccess({bikes: results.bikes}) : SuccessGetBikes(results);
            return [
              actionToReturn,
              setSearchLoading({loading: false})
            ];
          }),
          catchError((error) => of(ErrorGetBikes(error)))
        );
      }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiRidesService: ApiRidesService,
    private store: Store<SearchModel>
  ) {}
}
