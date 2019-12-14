import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {SearchService} from "../search.service";
import {of} from "rxjs";
import {
  SuccessGetBikes,
  ErrorGetBikes,
  StartGetBikes,
  GetBikesPage,
  GetBikesPageSuccess
} from "./search.actions";
import {Store} from "@ngrx/store";
import {SearchModel} from "../search.types";
import {getBikes, getSearchState} from "./index";

@Injectable()
export class SearchEffects {

  loadBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartGetBikes),
      withLatestFrom(this.store.select(getSearchState)),
      switchMap(([action, state]) => {
        return this.searchService.getRide(action.location)
        .pipe(
          switchMap(results => {
            return [
              SuccessGetBikes(results),
              GetBikesPageSuccess({bikes: results.bikes.slice(state.offset, state.limit)})
            ]
          }),
          catchError((error) => of(ErrorGetBikes(error)))
        )
      }
      )
    )
  );

  getBikesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBikesPage),
      withLatestFrom(this.store.select(getBikes)),
      map(([action, bikes]) => {
          return GetBikesPageSuccess({bikes: bikes.slice(action.offset, action.limit)});
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
