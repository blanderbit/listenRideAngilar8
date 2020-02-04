import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {SearchService} from '../search.service';
import {of} from 'rxjs';
import {
  SuccessGetBikes,
  ErrorGetBikes,
  GetBikes, GetBikesPage, GetBikesPageSuccess
} from './search.actions';
import {Store} from '@ngrx/store';
import {SearchModel} from '../search.types';
import {getFilterPayload, getSearchState} from './index';

@Injectable()
export class SearchEffects {

  loadBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBikes),
      withLatestFrom(this.store.select(getSearchState)),
      switchMap(([action, state]) => {
        const payload = {...state.filterPayload};
        return this.searchService.getRide(payload)
        .pipe(
          switchMap(results => {
            const actionToReturn = payload.page > 1 ? GetBikesPageSuccess({bikes: results.bikes}) : SuccessGetBikes(results);
            return [
              actionToReturn
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
    private searchService: SearchService,
    private store: Store<SearchModel>
  ) {}
}
