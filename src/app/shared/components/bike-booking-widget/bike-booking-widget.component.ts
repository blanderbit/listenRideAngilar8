import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { ExpandedBikeData } from '@models/bike/bike.types';
import { ApiRidesService } from '@api/api-rides/api-rides.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { Observable, combineLatest, Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { DATE_FORMAT, YEAR_MONTH_FORMAT } from '@core/constants/time';
import {
  filter,
  first,
  pairwise,
  startWith,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { User } from '@models/user/user';
import { Actions, ofType } from '@ngrx/effects';
import * as moment from 'moment';
import * as BikeActions from '@modules/bike/store/actions';
import {
  BikeState,
  BookingData,
  EngagedTime,
  HourTypes,
} from '@modules/bike/types';
import * as fromBike from '@modules/bike/store';
import {
  BookingSubmit,
  DatesRange,
  HalfDaysData,
  HourPickerOption,
  HourPickerEventParams,
} from './types';
import {
  checkIsBikeLoaded,
  isValidDate,
  getAvailableHalfDays,
  getAvailableToReturnHours,
  getDayHalvesData,
  getInitialHourPickerOptions,
} from './helpers';

@Component({
  selector: 'lnr-bike-booking-widget',
  templateUrl: './bike-booking-widget.component.html',
  styleUrls: ['./bike-booking-widget.component.scss'],
})
export class BikeBookingWidgetComponent implements OnInit, OnDestroy {
  @Input() isPricesSectionShown: boolean;

  @Input() buttonText: string;

  @Input() isButtonDisabled: boolean;

  @Output() submitEvent = new EventEmitter<BookingSubmit>();

  public currentBike$: Observable<ExpandedBikeData>;

  public engagedTime$: Observable<EngagedTime>;

  public selectedDays$: Observable<DatesRange>;

  public dayHalvesData: HalfDaysData = {};

  public hourPickerOptions: Array<HourPickerOption> = [];

  public isTimePickerShown: boolean;

  public bikeData$: Observable<BikeState>;

  public bookingData$: Observable<BookingData>;

  public isSubmitButtonDisabled: boolean;

  public shownErrors: Array<string>;

  // The simplest way to preserve original key-value order in ng-template
  public preserveOrder = (): 1 => 1;

  public hourTypes = HourTypes;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private availableMonths: Array<string> = [];

  public isDataLoading$: Observable<boolean>;

  public hourSelectOpen = new EventEmitter<HourPickerEventParams>();

  private user$: Observable<Partial<User>>;

  constructor(
    private apiRidesService: ApiRidesService,
    private authStore: Store<fromAuth.State>,
    private bikeStore: Store<BikeState>,
    private actions$: Actions,
  ) {
    this.hourPickerOptions = getInitialHourPickerOptions();
    this.currentBike$ = bikeStore.select(fromBike.selectCurrentBikeData);
    this.selectedDays$ = bikeStore.select(fromBike.selectBookingDays);
    this.bookingData$ = bikeStore.select(fromBike.selectBookingData);
    this.bikeData$ = bikeStore.select(fromBike.selectBikeState);
    this.engagedTime$ = bikeStore.select(fromBike.selectEngagedTime);
    this.isDataLoading$ = bikeStore.select(fromBike.selectIsLoading);
    this.user$ = authStore.select(fromAuth.selectUser);
  }

  ngOnInit(): void {
    const { bookingData$, user$, selectedDays$, engagedTime$, destroy$ } = this;

    combineLatest(bookingData$, user$, engagedTime$, selectedDays$)
      .pipe(
        withLatestFrom(this.currentBike$, this.isDataLoading$),
        takeUntil(destroy$),
      )
      .subscribe(([[bookingData, user, engagedTime], bikeData, isLoading]) => {
        this.processSelectedDaysChange(bookingData, bikeData, engagedTime);
        this.processBookingDataChange(bookingData, bikeData);
        this.checkIsBookingAvailable(
          bookingData,
          bikeData,
          user,
          engagedTime,
          isLoading,
        );
      });
    this.currentBike$
      .pipe(startWith(null), pairwise(), takeUntil(destroy$))
      .subscribe(async ([prevBikeData, bikeData]) => {
        this.processBikeDataChange(bikeData, prevBikeData);
      });
    this.subscribeToHourPickerOpening();
    this.subscribeToEngagedTimeChanges();
  }

  async processBikeDataChange(
    bikeData: ExpandedBikeData,
    prevBikeData: ExpandedBikeData,
  ): Promise<void> {
    if (bikeData && !checkIsBikeLoaded(bikeData.id, prevBikeData)) {
      const today = moment();
      const nextMonthEnd = moment()
        .add(1, 'month')
        .endOf('month');

      this.bikeStore.dispatch(
        BikeActions.loadEngagedTime({
          startDate: today.format(DATE_FORMAT),
          endDate: nextMonthEnd.format(DATE_FORMAT),
        }),
      );
    }
  }

  processSelectedDaysChange(
    { startDay, endDay }: BookingData,
    bikeData: ExpandedBikeData | undefined,
    engagedTime: EngagedTime | undefined,
  ): void {
    this.isTimePickerShown = !!startDay;
    this.hourPickerOptions = getInitialHourPickerOptions();

    if (!bikeData || !startDay || !endDay || !engagedTime.engagedHoursByDay) {
      return;
    }
    if (bikeData && bikeData.isHalfDay && startDay.isSame(endDay, 'day')) {
      const dateString = startDay.format(DATE_FORMAT);
      const dayHalves = getAvailableHalfDays(
        engagedTime.engagedHoursByDay[dateString],
        bikeData.timeSlots,
      );

      if (dayHalves.length) {
        this.isTimePickerShown = false;
        this.dayHalvesData = getDayHalvesData(bikeData.timeSlots, dayHalves);
      }
    }
  }

  processBookingDataChange(booking: BookingData, bike: ExpandedBikeData): void {
    const { pickUpHour, returnHour, startDay = moment(), endDay } = booking;

    if (bike && bike.isHalfDay && startDay.isSame(endDay, 'day')) {
      Object.entries(this.dayHalvesData).forEach(([key, value]) => {
        if (value.startHour >= pickUpHour && value.startHour <= returnHour) {
          this.isTimePickerShown = false;
          this.dayHalvesData[key].isChecked = true;
        }
      });
    } else {
      this.dayHalvesData = {};
    }
  }

  onDatesRangeSet(range: DatesRange): void {
    this.bikeStore.dispatch(BikeActions.setSelectedDates(range));
  }

  public onNextMonthRequest = async (monthWithYear: string): Promise<void> => {
    const currentMonth = moment(monthWithYear, YEAR_MONTH_FORMAT);

    if (!this.availableMonths.includes(monthWithYear)) {
      this.bikeStore.dispatch(
        BikeActions.loadEngagedTime({
          startDate: currentMonth.startOf('month').format(DATE_FORMAT),
        }),
      );
      await this.actions$
        .pipe(ofType(BikeActions.setEngagedTime), first())
        .toPromise();
    }

    const nextMonth = moment(currentMonth)
      .add(1, 'months')
      .startOf('month');
    const nextMonthString = nextMonth.format(YEAR_MONTH_FORMAT);
    if (!this.availableMonths.includes(nextMonthString)) {
      this.bikeStore.dispatch(
        BikeActions.loadEngagedTime({
          startDate: nextMonth.format(DATE_FORMAT),
        }),
      );
    }
  };

  onHourSelectOpen(
    hourType: HourTypes,
    { startDay, endDay, pickUpHour }: BookingData,
    { engagedHoursByDay }: EngagedTime,
  ): void {
    const key = (hourType === HourTypes.PickUp ? startDay : endDay).format(
      DATE_FORMAT,
    );
    const { unavailable, closed } = engagedHoursByDay[key];
    if (hourType === HourTypes.PickUp) {
      const unavailableHoursToStart = [...unavailable, ...closed];

      this.hourPickerOptions = this.hourPickerOptions.map(option => ({
        ...option,
        isDisabled: unavailableHoursToStart.includes(option.value),
      }));
    } else {
      const firstAvailableHour =
        startDay.isSame(endDay, 'day') && pickUpHour ? pickUpHour : 0;
      const availableHours = getAvailableToReturnHours(
        unavailable,
        closed,
        firstAvailableHour,
      );

      this.hourPickerOptions = this.hourPickerOptions.map(option => ({
        ...option,
        isDisabled: !availableHours.includes(option.value),
      }));
    }
  }

  async onSubmitButtonClick(): Promise<void> {
    const bookingData = await this.bikeStore
      .select(fromBike.selectBookingData)
      .pipe(first())
      .toPromise();
    const { startDay, endDay, pickUpHour, returnHour } = bookingData;
    const startDate = startDay
      .hour(pickUpHour)
      .startOf('hour')
      .toDate();
    const endDate = endDay
      .hour(returnHour)
      .startOf('hour')
      .toDate();

    this.submitEvent.emit({
      startDate,
      endDate,
    });
  }

  onSizeSelectionChange({ value: prettySize }: MatSelectChange): void {
    this.bikeStore.dispatch(BikeActions.setBikeFromVariations({ prettySize }));
  }

  onHourSelectChange({ value }: MatSelectChange, type: HourTypes): void {
    this.bikeStore.dispatch(
      BikeActions.setSelectedHours({
        ...(type === HourTypes.PickUp
          ? { pickUpHour: value }
          : { returnHour: value }),
      }),
    );
  }

  onHalfDayChange(): void {
    const [fistHalf, secondHalf] = Object.values(this.dayHalvesData)
      .filter(({ isChecked }) => isChecked)
      .sort((a, b) => a.startHour - b.startHour);
    const pickUpHour = (fistHalf && fistHalf.startHour) || null;
    const returnHour =
      (secondHalf && secondHalf.endHour) ||
      (fistHalf && fistHalf.endHour) ||
      null;

    this.bikeStore.dispatch(
      BikeActions.setSelectedHours({
        pickUpHour,
        returnHour,
      }),
    );
  }

  checkIsBookingAvailable(
    bookingData: BookingData,
    bikeData: ExpandedBikeData | undefined,
    user: Partial<User> | undefined,
    engagedTime: EngagedTime,
    isLoading: boolean,
  ): void {
    const { pickUpHour, returnHour } = bookingData;
    this.shownErrors = [];

    if (user && bikeData && bikeData.user.id === user.id) {
      this.shownErrors.push('calendar.own-bike');
    } else if (pickUpHour && returnHour && engagedTime.engagedDays) {
      if (!isValidDate(bookingData, engagedTime)) {
        this.shownErrors.push('calendar.invalid-date');
      }
    }

    this.isSubmitButtonDisabled =
      this.isButtonDisabled ||
      isLoading ||
      pickUpHour === undefined ||
      returnHour === undefined ||
      !!this.shownErrors.length;
  }

  subscribeToEngagedTimeChanges(): void {
    this.actions$
      .pipe(
        ofType(BikeActions.setEngagedTime),
        withLatestFrom(this.actions$.pipe(ofType(BikeActions.loadEngagedTime))),
        takeUntil(this.destroy$),
      )
      .subscribe(([{ engagedTime }, { startDate, endDate }]) => {
        if (!engagedTime) {
          this.availableMonths = [];
        } else {
          [startDate, endDate].filter(Boolean).forEach(dateString => {
            this.availableMonths.push(
              moment(dateString).format(YEAR_MONTH_FORMAT),
            );
          });
        }
      });
  }

  subscribeToHourPickerOpening(): void {
    this.hourSelectOpen
      .pipe(
        filter(({ isOpen }) => isOpen),
        withLatestFrom(this.bookingData$, this.engagedTime$),
        takeUntil(this.destroy$),
      )
      .subscribe(([{ hourType }, bookingData, engagedTime]) =>
        this.onHourSelectOpen(hourType, bookingData, engagedTime),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
