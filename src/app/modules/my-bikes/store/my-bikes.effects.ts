import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  catchError,
  delay,
  filter,
  map,
  repeat,
  switchMap,
  takeWhile,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {of} from 'rxjs';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {Store} from '@ngrx/store';
import {SearchModel} from '../../search/search.types';
import * as myBikes from './my-bikes.actions';
import {ErrorGetBikes} from '../../search/store/search.actions';
import * as fromAuth from '@auth/store/reducers';

@Injectable()
export class MyBikesEffects {

  loadMyBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(myBikes.GetMyBikes, myBikes.GetMyFilteredBikes),
      withLatestFrom(this.store.select(fromAuth.selectAuthGetUser)),
      filter(([action, userState]) => !!userState.id),
      tap(res => this.store.dispatch(myBikes.SetMyBikesLoading({loading: true}))),
      switchMap(([action, state]) => {
          const params = action.type === myBikes.GetMyFilteredBikes.type ? action.params : null;
          return this.apiRidesService.getByUserId(state.id, params)
            .pipe(
              switchMap(results => {
                return [
                  myBikes.SuccessGetMyBikes(results),
                  myBikes.SetMyBikesLoading({loading: false})
                ];
              }),
              catchError((error) => of(ErrorGetBikes(error)))
            );
        }
      )
    )
  );

  watchBikeJob = createEffect (() =>
    this.actions$.pipe(
      ofType(myBikes.WatchBikeJob),
      switchMap((action) => this.apiRidesService.getBikeJobStatus(action.bikeId, action.jobId)
        .pipe(
          delay(400),
          repeat(50),
          filter(res => res.status === 'complete'),
          map(jobDone => myBikes.GetMyBikes()),
          takeWhile(res => res.type !== myBikes.GetMyBikes.type)
        )
      ),
      catchError((error) => of(ErrorGetBikes(error)))
    )
  );

  mergeBike$ = createEffect (() =>
    this.actions$.pipe(
      ofType(myBikes.MergeBikes),
      tap(res => this.store.dispatch(myBikes.SetMyBikesLoading({loading: true}))),
      switchMap((action) => this.apiRidesService.clusterizeBikes(action.bikeIds)
        .pipe(
          map(del => myBikes.GetMyBikes()),
          catchError((error) => of(myBikes.BikesError(error)))
        )
      )
    )
  );

  unmergeBike$ = createEffect (() =>
    this.actions$.pipe(
      ofType(myBikes.UnmergeBikes),
      tap(res => this.store.dispatch(myBikes.SetMyBikesLoading({loading: true}))),
      switchMap((action) => this.apiRidesService.declusterizeBikes(action.clusterId)
        .pipe(
          map(del => myBikes.GetMyBikes()),
          catchError((error) => of(myBikes.BikesError(error)))
        )
      )
    )
  );

  updateBike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(myBikes.UpdateBike),
      tap(res => this.store.dispatch(myBikes.SetMyBikesLoading({loading: true}))),
      switchMap((action) => this.apiRidesService.updateBike(action.bikeId, action.bike)
        .pipe(
          map(del => myBikes.GetMyBikes()),
          catchError((error) => of(myBikes.BikesError(error)))
        )
      )
    )
  );

  deleteBike$ = createEffect (() =>
    this.actions$.pipe(
      ofType(myBikes.DeleteBike),
      tap(res => this.store.dispatch(myBikes.SetMyBikesLoading({loading: true}))),
      switchMap((action) => this.apiRidesService.deleteBike(action.bikeId)
        .pipe(
          map(del => myBikes.GetMyBikes()),
          catchError((error) => of(myBikes.BikesError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiRidesService: ApiRidesService,
    private store: Store<SearchModel | fromAuth.State>
  ) {}
}
