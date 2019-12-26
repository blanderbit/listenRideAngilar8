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
  GetBikesPageSuccess, GetUnavailableBikes, SuccessGetUnavailableBikes
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
        return this.searchService.getRide(action.location, action.sizes)
        .pipe(
          switchMap(results => {
            if(results.bikes) {
              results.bikesMap = {};
              results.bikes.forEach(bike => results.bikesMap[bike.id] = bike);
            }
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

  getUnavailableBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUnavailableBikes),
      withLatestFrom(this.store.select(getSearchState)),
      switchMap(([action, state]) => {
          return this.searchService.getUnavailableRides(action.startDate, action.duration)
            .pipe(
              switchMap(results => {
                const filteredBikes = [];
                const bikeIds = Object.keys(state.bikesMap);

                bikeIds.map(bikeId => {
                  if (results.ids.indexOf(bikeId) === -1){
                    filteredBikes.push(state.bikesMap[bikeId])
                  }
                  }
                );

                return of(SuccessGetUnavailableBikes({filteredBikes: filteredBikes}))
              }),
              catchError((error) => of(ErrorGetBikes(error))))
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
