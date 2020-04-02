import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, ofType, OnInitEffects, Effect } from '@ngrx/effects';
import { ApiRidesService } from '@api/api-rides/api-rides.service';
import { first, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { URL_DATE_FORMAT } from '@core/constants/time';
import get from 'lodash-es/get';
import * as moment from 'moment';
import { ExpandedBikeData } from '@models/bike/bike.types';
import * as BikeActions from '../actions';
import { BikeState, BookingData } from '../../types';
import { selectBookingData, selectCurrentBikeData } from '../index';
import { setSelectedDates, setSelectedHours } from '../actions';

@Injectable()
export class BikeEffects implements OnInitEffects {
  private bikeIdSnapshot: string;

  @Effect({ dispatch: false })
  $loadBike = this.actions$.pipe(
    ofType(BikeActions.loadBike),
    withLatestFrom(
      this.store$.select(selectCurrentBikeData),
      ({ bikeId }, currentBikeData) => {
        if (!currentBikeData || Number(bikeId) !== currentBikeData.id) {
          this.apiRidesService
            .getExpandedBikeData(bikeId)
            .pipe(first())
            .subscribe(
              bikeData => {
                this.store$.dispatch(BikeActions.setBike({ bikeData }));
              },
              () => {
                this.router.navigate(['404']).then();
              },
            );
          this.bikeIdSnapshot = bikeId;
        }
      },
    ),
  );

  @Effect({ dispatch: false })
  $processSelectedHours = this.actions$.pipe(
    ofType(BikeActions.setSelectedHours),
    withLatestFrom(
      this.store$.select(selectBookingData),
      this.store$.select(selectCurrentBikeData),
      (action, bookingData, bikeData) => {
        const { pickUpHour, returnHour } = bookingData;

        if (pickUpHour && returnHour) {
          this.processSelectedHoursChange(bookingData, bikeData);
        }
      },
    ),
  );

  @Effect({ dispatch: false })
  $processSetBikeFromVariations = this.actions$.pipe(
    ofType(BikeActions.setBikeFromVariations),
    withLatestFrom(
      this.store$.select(selectCurrentBikeData),
      (action, { id }) => {
        const { location } = window;
        const newLocation = `${location.pathname}${location.search}`.replace(
          this.bikeIdSnapshot,
          String(id),
        );

        this.location.replaceState(newLocation);
      },
    ),
  );

  constructor(
    private actions$: Actions,
    private apiRidesService: ApiRidesService,
    private store$: Store<BikeState>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngrxOnInitEffects(): Action {
    this.route.queryParams.pipe().subscribe(params => {
      const { duration } = params;
      const paramsStart = get(params, 'start_date', '');
      const isValidDate = moment(paramsStart, URL_DATE_FORMAT, true).isValid();

      if (isValidDate && duration) {
        const startDate = moment(paramsStart);
        const endDate = moment(startDate).add(parseInt(duration, 10), 's');
        this.store$.dispatch(setSelectedDates({ startDate, endDate }));
        this.store$.dispatch(
          setSelectedHours({
            pickUpHour: startDate.get('h'),
            returnHour: endDate.get('h'),
          }),
        );
      }
    });
    return { type: '' };
  }

  processSelectedHoursChange(
    bookingData: BookingData,
    bikeData: ExpandedBikeData,
  ): void {
    const { pickUpHour, returnHour, startDay, endDay } = bookingData;
    const startDate = startDay.hour(pickUpHour).format(URL_DATE_FORMAT);
    const endDate = endDay.hour(returnHour).startOf('hour');
    const duration = endDate.diff(startDay, 'seconds');
    const { location } = window;
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('start_date', startDate);
    searchParams.set('duration', String(duration));
    this.location.replaceState(
      `${location.pathname}?${searchParams.toString()}`,
    );
    if (bikeData && bikeData.clusterId) {
      this.apiRidesService
        .getAvailableSizesByCluster(bikeData.clusterId, startDate, duration)
        .pipe(first())
        .subscribe(({ rideIds }) => {
          this.store$.dispatch(BikeActions.setAvailableVariations({ rideIds }));
        });
    }
  }
}
